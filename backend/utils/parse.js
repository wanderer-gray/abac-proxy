const { Parser } = require('abac-kernel')

module.exports = (source, app) => {
  const { log, httpErrors } = app

  log.debug(`parse: source=${source}`)

  try {
    const code = Parser.Parse(source)

    log.info(`parse: code=${JSON.stringify(code)}`)

    return code
  } catch {
    log.warn('parse: Исходный код содержит ошибки')

    throw httpErrors.badRequest('Исходный код содержит ошибки')
  }
}
