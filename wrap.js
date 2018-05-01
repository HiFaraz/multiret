/**
 * Forces a Promise to resolve with a [err, result] signature
 *
 * Useful for Promise.all when you do not want to exit after the first Promise
 * rejection
 *
 * @param {Promise<any>} promise
 * @returns{any[]}
 */
async function wrap(promise) {
  try {
    return [null, await promise];
  } catch (err) {
    return [err];
  }
}

module.exports = wrap;
