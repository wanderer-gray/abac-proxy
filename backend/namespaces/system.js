const {
  Namespace,
  Attribute,
  Function
} = require('abac-kernel')
const cookieSignature = require('cookie-signature')
const http = require('./http')

const ip = Attribute.new({
  name: 'ip',
  path: ['ip'],
  schema: { type: 'string' }
})

const protocol = Attribute.new({
  name: 'protocol',
  path: ['protocol'],
  schema: { type: 'string' }
})

const url = Attribute.new({
  name: 'url',
  path: ['url'],
  schema: { type: 'string' }
})

const method = Attribute.new({
  name: 'method',
  path: ['method'],
  schema: { type: 'string' }
})

const headers = Attribute.new({
  name: 'headers',
  path: ['headers'],
  schema: { type: 'object' }
})

const query = Attribute.new({
  name: 'query',
  path: ['query'],
  schema: { type: 'object' }
})

const body = Attribute.new({
  name: 'body',
  path: ['body'],
  schema: {
    type: 'object',
    nullable: true
  }
})

const env = Attribute.new({
  name: 'env',
  path: ['env'],
  schema: {
    type: 'object',
    properties: {
      second: { type: 'number' },
      minute: { type: 'number' },
      hour: { type: 'number' },
      day: { type: 'number' },
      month: { type: 'number' },
      year: { type: 'number' },
      day_week: { type: 'number' }
    }
  }
})

const _const = Attribute.new({
  name: 'const',
  path: ['const'],
  schema: {
    type: 'object',
    properties: {
      day_week: {
        type: 'object',
        properties: {
          mo: { type: 'number' },
          tu: { type: 'number' },
          we: { type: 'number' },
          th: { type: 'number' },
          fr: { type: 'number' },
          sa: { type: 'number' },
          su: { type: 'number' }
        }
      }
    }
  }
})

const isAuth = Attribute.new({
  name: 'isAuth',
  path: ['isAuth'],
  schema: {
    type: 'boolean'
  },
  computer: (data) => {
    const { headers } = data
    const { cookie } = headers

    if (typeof cookie !== 'string') {
      return false
    }

    const value = decodeURIComponent(cookie.split('=')[1])

    return !!cookieSignature.unsign(value, 'test_secret')
  }
})

const UserId = Attribute.new({
  name: 'UserId',
  path: ['UserId'],
  schema: {
    type: 'string'
  },
  computer: (data) => {
    const { headers } = data
    const { cookie } = headers

    if (typeof cookie !== 'string') {
      return false
    }

    const [, value] = cookie.split('=')

    const [userId] = value.split('.')

    return userId
  }
})

const qUserId = Attribute.new({
  name: 'qUserId',
  path: ['query', 'userId'],
  schema: { type: 'string' }
})

const qOfficeId = Attribute.new({
  name: 'qOfficeId',
  path: ['query', 'officeId'],
  schema: { type: 'string' }
})

const len = Function.new({
  name: 'len',
  executor: (array) => {
    return array.length
  },
  argsSettings: [{
    schema: { type: 'array' }
  }],
  resultSettings: {
    schema: { type: 'number' }
  }
})

const map = Function.new({
  name: 'map',
  executor: (array, field) => {
    return array.map(({ [field]: value }) => value)
  },
  argsSettings: [
    {
      schema: { type: 'array' }
    }, {
      schema: { type: 'string' }
    }
  ],
  resultSettings: {
    schema: { type: 'array' }
  }
})

const include = Function.new({
  name: 'include',
  executor: (array, item) => {
    return array.includes(item)
  },
  argsSettings: [
    {
      schema: { type: 'array' }
    }, {
      schema: { type: 'string' }
    }
  ],
  resultSettings: {
    schema: { type: 'array' }
  }
})

const intersect = Function.new({
  name: 'intersect',
  executor: (left, right) => {
    const uniqLeft = new Set(left)
    return [...new Set(right)].filter((value) => uniqLeft.has(value))
  },
  argsSettings: [
    {
      schema: { type: 'array' }
    },
    {
      schema: { type: 'array' }
    }
  ],
  resultSettings: {
    schema: { type: 'array' }
  }
})

const getEmployees = Function.new({
  name: 'getEmployees',
  executor: async (userId) => {
    const employees = await http('http://127.0.0.1:81/api/employee/searchEmployees')
      .method('get')
      .query({ userId })

    return Promise.all(
      employees.map((employeeId) => {
        return http('http://127.0.0.1:81/api/employee/getEmployee')
          .method('get')
          .query({ employeeId })
      })
    )
  },
  argsSettings: [{
    schema: {
      type: 'string'
    }
  }],
  resultSettings: {
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          officeId: { type: 'string' }
        }
      }
    }
  }
})

module.exports = Namespace.new({ name: 'system' })
  .addAttribute(ip)
  .addAttribute(protocol)
  .addAttribute(url)
  .addAttribute(method)
  .addAttribute(headers)
  .addAttribute(query)
  .addAttribute(body)
  .addAttribute(env)
  .addAttribute(_const)
  .addAttribute(isAuth)
  .addAttribute(UserId)
  .addAttribute(qUserId)
  .addAttribute(qOfficeId)
  .addFunction(len)
  .addFunction(map)
  .addFunction(include)
  .addFunction(intersect)
  .addFunction(getEmployees)
