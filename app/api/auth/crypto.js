const { createHash } = require('node:crypto')

/**
 * Returns a SHA256 hash using SHA-3 for the given `content`.
 *
 * @see https://en.wikipedia.org/wiki/SHA-3
 *
 * @param {String} content
 *
 * @returns {String}
 */
function sha256(content) {  
  return createHash('sha3-256').update(content).digest('hex')
}

module.export = { sha256 }