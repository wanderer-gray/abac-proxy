const fastify = require('fastify')
const fastifyPlugin = require('fastify-plugin')
const httpProxy = require('http-proxy')
const getBodyRaw = require('./getBodyRaw')
const getRequestData = require('./getRequestData')
const getAbac = require('./getAbac')

module.exports = fastifyPlugin(async function (app, options) {
  const {
    host,
    port,
    target
  } = options

  const onRequest = async (request, reply) => {
    const requestRaw = request.raw
    const replyRaw = reply.raw

    const bodyRaw = await getBodyRaw(request)

    const requestData = getRequestData(request, bodyRaw)

    const abac = await getAbac(options, app)

    const result = await abac.Context(requestData)

    if (result !== 'permit') {
      reply
        .code(403)
        .send()

      return
    }

    const proxy = httpProxy.createProxyServer({ target })

    proxy.on('proxyReq', (proxyReq) => {
      if (bodyRaw) {
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyRaw))
        proxyReq.write(bodyRaw)
      }
    })

    proxy.on('error', (error, _, response) => {
      const message = {
        name: error.name,
        message: error.message
      }

      response
        .writeHead(500)
        .end(message)
    })

    proxy.web(requestRaw, replyRaw)
  }

  const server = fastify()

  server.addHook('onRequest', (request, reply) => {
    onRequest(request, reply)
  })

  await server.listen({
    host,
    port
  })
})
