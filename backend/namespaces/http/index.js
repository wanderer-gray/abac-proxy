const fetch = require('node-fetch')

class HttpBuilder {
  constructor (url) {
    this._url = url
    this._method = undefined
    this._query = undefined
    this._body = undefined
  }

  url (url) {
    this._url = url

    return this
  }

  method (method) {
    this._method = method

    return this
  }

  query (query) {
    this._query = query

    return this
  }

  body (body) {
    this._body = body

    return this
  }

  _getUrl () {
    const url = new URL(this._url)

    url.search = new URLSearchParams(this._query)

    return url
  }

  _getOptions () {
    const options = {
      method: this._method
    }

    const body = this._body

    if (body) {
      options.headers = {
        'Content-Type': 'application/json;charset=utf-8'
      }
      options.body = JSON.stringify(body)
    }

    return options
  }

  _request () {
    const url = this._getUrl()
    const options = this._getOptions()

    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        return response.text()
      })
      .then((response) => {
        try {
          return JSON.parse(response)
        } catch {
          return response
        }
      })
  }

  then (resolve, reject) {
    return this._request()
      .then(resolve)
      .catch(reject)
  }

  catch (reject) {
    return this._request()
      .catch(reject)
  }
}

module.exports = (url) => new HttpBuilder(url)
