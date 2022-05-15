const app = require('fastify')({
  logger: {
    level: 'trace',
    prettyPrint: true
  }
})

const config = require('./config')[process.env.NODE_ENV || 'development']

app.decorate('config', config)

app.register(require('fastify-oas'), config.oas)

app.register(require('fastify-knexjs'), config.knex)

app.register(require('fastify-cookie'), config.cookie)

app.register(require('fastify-sensible'))

app.register(require('./abac'))

app.register(require('./proxy'))

app.register(require('./abac-api'), { prefix: '/abac-api' })

app.ready((err) => {
  if (err) {
    process.exit(1)
  }

  app.oas()

  app.proxy({
    target: 'http://127.0.0.1:8080',
    port: 7080
  })
})

app.listen(config.server, (err, addr) => {
  if (err) {
    process.exit(1)
  }

  app.log.info(`Swagger UI listening at ${addr}${config.oas.routePrefix}/index.html`)
  app.log.info(`ReDoc UI listening at ${addr}${config.oas.routePrefix}/docs.html`)
})
