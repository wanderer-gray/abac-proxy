const getEnv = () => {
  const date = new Date()

  return {
    second: date.getSeconds(),
    minute: date.getMinutes(),
    hour: date.getHours(),
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    day_week: date.getDay()
  }
}

const getConst = () => {
  return {
    day_week: {
      mo: 1,
      tu: 2,
      we: 3,
      th: 4,
      fr: 5,
      sa: 6,
      su: 7
    }
  }
}

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
    query,
    env: getEnv(),
    const: getConst()
  }

  try {
    requestData.body = JSON.parse(bodyRaw.toString())
  } catch {
    requestData.body = null
  }

  return requestData
}
