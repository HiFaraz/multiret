/**
 * Group Promise.all return values into errors and results
 *
 * From [error, result, error, result] to [errors, results]
 *
 * @param {Promise<any>[]} list
 * @returns {Promise<Array<any>>}
 */
function group(list) {
  return Promise.all(list).then(results => {
    const errors = [];
    results.forEach(([error]) => {
      return error ? errors.push(error) : null;
    });
    return errors.length
      ? [errors]
      : [null, results.map(([, result]) => result)];
  });
}

module.exports = group;
