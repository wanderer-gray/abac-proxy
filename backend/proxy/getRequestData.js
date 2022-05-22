module.exports = (request, bodyRaw) => {
  const {
    ip,
    protocol,
    url,
    method,
    headers,
    query
  } = request

  const requestData = {
    ip,
    protocol,
    url,
    method,
    headers,
    query
  }

  try {
    requestData.body = JSON.parse(bodyRaw.toString())
  } catch {
    requestData.body = null
  }

  return requestData
}
