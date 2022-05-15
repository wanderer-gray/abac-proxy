const fastify = require('fastify')
const fastifyPlugin = require('fastify-plugin')
const httpProxy = require('http-proxy')

async function getData (request, req) {
  const chunks = []

  for await (const chunk of req) {
    chunks.push(chunk)
  }

  const buffer = Buffer.concat(chunks)

  const {
    ip,
    protocol,
    url,
    method,
    headers,
    query
  } = request

  const data = {
    ip,
    protocol,
    url,
    method,
    headers,
    query,
    buffer
  }

  try {
    data.body = JSON.parse(buffer.toString())
  } catch {
    data.body = null
  }

  return data
}

module.exports = fastifyPlugin(async function (app) {
  app.decorate('proxy', function (options) {
    const {
      target,
      port
    } = options

    async function onRequest (request, reply) {
      const req = request.raw
      const res = reply.raw

      const {
        buffer,
        ...data
      } = await getData(request, req)

      const result = await app.abac.Context(data)

      app.log.debug(`abac result: ${result}`)

      if (result !== 'permit') {
        res.writeHead(403, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
          message: 'Недостаточно прав'
        }))

        return
      }

      const proxy = httpProxy.createProxyServer({ target })

      proxy.on('proxyReq', (proxyReq) => {
        if (buffer) {
          proxyReq.setHeader('Content-Length', Buffer.byteLength(buffer))
          proxyReq.write(buffer)
        }
      })

      proxy.on('error', (err, req, res) => {
        res.writeHead(500, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
          name: err.name,
          message: err.message
        }))
      })

      proxy.web(req, res)
    }

    const server = fastify()

    server.addHook('onRequest', (request, reply) => {
      onRequest(request, reply)
    })

    server.listen(port)
  })
})
