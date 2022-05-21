module.exports = async function (app) {
  app.log.info('Mount "abac-api"')

  app.decorateRequest('userId', null)

  app.addHook('onRequest', async function (request, reply) {
    const signUserId = request.cookies.userId

    if (typeof signUserId !== 'string') {
      return
    }

    const unsignUserId = reply.unsignCookie(signUserId)

    if (unsignUserId.valid && !unsignUserId.renew) {
      request.userId = unsignUserId.value
    }
  })

  app.register(require('./namespace'), { prefix: '/namespace' })

  app.register(require('./attribute'), { prefix: '/attribute' })

  app.register(require('./function'), { prefix: '/function' })

  app.register(require('./target'), { prefix: '/target' })

  app.register(require('./condition'), { prefix: '/condition' })

  app.register(require('./effect'), { prefix: '/effect' })

  app.register(require('./rule'), { prefix: '/rule' })

  app.register(require('./algorithmRule'), { prefix: '/algorithmRule' })

  app.register(require('./policy'), { prefix: '/policy' })

  app.register(require('./algorithmPolicy'), { prefix: '/algorithmPolicy' })

  app.register(require('./policySet'), { prefix: '/policySet' })
}
