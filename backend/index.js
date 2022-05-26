const app = require('fastify')()

const config = require('./config')[process.env.NODE_ENV || 'development']

app.decorate('config', config)

app.register(require('fastify-oas'), config.oas)

app.register(require('fastify-knexjs'), config.knex)

app.register(require('@fastify/cookie'), config.cookie)

app.register(require('@fastify/sensible'))

app.register(require('./namespaces'))

app.register(require('./proxy'), config.proxy)

app.register(require('./auth'), { prefix: '/auth' })

app.register(require('./api'), { prefix: '/api' })

app.listen(config.server, (err, addr) => {
  if (err) {
    process.exit(1)
  }

  app.log.info(`Swagger UI listening at ${addr}${config.oas.routePrefix}/index.html`)
  app.log.info(`ReDoc UI listening at ${addr}${config.oas.routePrefix}/docs.html`)
})
