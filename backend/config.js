const host = '127.0.0.1'
const port = 8081

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
        }]
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
        max: 4,
        afterCreate: (conn, cb) =>
          conn.run('PRAGMA foreign_keys = ON', cb)
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
    },
    proxy: {
      host: '127.0.0.1',
      port: 82,
      target: 'http://127.0.0.1:81',
      algorithm: 'only-one-applicable',
      namespaceName: 'system'
    }
  }
}
