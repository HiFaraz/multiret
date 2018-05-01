# multiret
JavaScript utility library for Promises with multiple return values

## Multiple return values simplify error handling for multiple asynchronous operations

When handling multiple asynchronous business operations, exceptions can make it difficult to determine which promise rejected and what to rollback. Jumping to a catch block without context requires boilerplate to regain the context. Instead a mutiple return Promise would be more convenient, such as:

```js
const [err, result] = await promise;

if (error) {
  // process error
} else {
  // process result
}
```

This paradigm adopts the strengths of the classic error-first signature while fully embracing `async/await` and promises. It's especially useful for loops where `Promise.all` would not return the full list of errors. Instead, this is possible:

```js
const [errors, results] = await group([
  promise1,
  promise2,
])
```

## Installation

```sh
$ npm install multiret
```

## Usage

```js
const multiret = require('multiret');
```

## API

### multiret(promise)

Forces a `Promise` to resolve with a `[err, result]` signature

### multiret.group([...promises])

Forces an array of multi-return promises to resolve with an `[errors, results]` signature. Similar to `Promise.all`, except that it does not stop on the first promise rejection

### multiret.retry(fn, opts)

Retry an `AsyncFunction` `fn` according to `opts` options.

Options:

#### interval

Initial time to wait in milliseconds.

Default: `1000`

#### factor

Exponential growth factor for `interval`

Default: `2`

#### forever

Flag to ignore `limit` and have infinite retries.

Default: `false`

#### limit

Maximum number of retries.

Default: `10`

#### couldRetry(err, result)

Test if retry should occur.

Default: `() => true`

## Author

Faraz Syed

## License

MIT