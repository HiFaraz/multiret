const pDelay = require('./delay');

/**
 * Retry an async action, with exponential delay growth
 *
 * @param {AsyncFunction} fn
 * @param {number} interval
 * @param {number} factor
 * @param {boolean} forever
 * @param {number} limit
 * @param {Function} [couldRetry=()=>true]
 * @returns {Promise<any[]>}
 */
function retry(
  fn,
  { interval, factor, forever, limit, couldRetry = () => true },
) {
  async function attempt(remaining, delay) {
    const [error, result] = await fn();

    if ((forever || remaining > 0) && couldRetry(error, result)) {
      // should retry
      await pDelay(delay);
      return attempt(forever ? null : remaining - 1, delay * factor);
    }

    return error ? [error] : [null, result];
  }

  return attempt(forever ? null : limit, interval);
}

module.exports = retry;
