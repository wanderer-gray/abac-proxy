const host = '127.0.0.1'
const port = 80

module.exports = {
  development: {
    oas: {
      routePrefix: '/swagger',
      swagger: {
        info: {
          title: 'abac-proxy',
          version: '1.0.0'
        },
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        servers: [{
          url: `http://${host}:${port}`,
          description: 'Local server'
        }],
        tags: [
        ]
      },
      exposeRoute: true
    },
    knex: {
      client: 'sqlite3',
      connection: {
        filename: './abac-proxy.sqlite'
      },
      pool: {
        min: 1,
        max: 4
      },
      migrations: {
        tableName: 'knex_migrations'
      },
      useNullAsDefault: true
    },
    cookie: {
      secret: 'test_secret'
    },
    server: {
      host,
      port
    }
  }
}
