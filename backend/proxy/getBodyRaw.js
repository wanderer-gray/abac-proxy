module.exports = async (request) => {
  try {
    const requestRaw = request.raw

    const requestChunks = []

    for await (const requestChunk of requestRaw) {
      requestChunks.push(requestChunk)
    }

    return [false, Buffer.concat(requestChunks)]
  } catch {
    return [true]
  }
}
