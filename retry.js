const pDelay = require('./delay');

/**
 * Retry an async action, with exponential delay growth
 *
 * @param {AsyncFunction} fn
 * @param {number} [interval=1000]
 * @param {number} [factor=2]
 * @param {boolean} [forever=false]
 * @param {number} [limit=10]
 * @param {Function} [couldRetry=()=>true]
 * @returns {Promise<any[]>}
 */
function retry(
  fn,
  {
    interval = 1000,
    factor = 2,
    forever = false,
    limit = 10,
    couldRetry = () => true,
  },
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
