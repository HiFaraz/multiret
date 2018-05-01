/**
 * Returns a Promise that resolves after `interval` milliseconds
 *
 * @param {number} interval
 * @returns {Promise<any>}
 */
function delay(interval) {
  return new Promise(resolve => setTimeout(resolve, interval));
}

module.exports = delay;
