module.exports = async (request) => {
  const requestRaw = request.raw

  const requestChunks = []

  for await (const requestChunk of requestRaw) {
    requestChunks.push(requestChunk)
  }

  return Buffer.concat(requestChunks)
}
