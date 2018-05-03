# multiret
JavaScript utility library for Promises with multiple return values

## Multiple return values simplify complex error handling

Exceptions can make it difficult to determine context and rollback actions when handling multiple asynchronous business operations. Jumping to a `catch` block without context requires unnecessary boilerplate just to regain that context (for example switch statements against custom codes added in the `try` block). Instead a mutiple-return promise would be more convenient. Consider this example:

```js
const [docsErr, docs] = await getDocuments();

if (docsErr) {
  // propogate the error, can't do anything without docs
}

const [imgsErr, imgs] = await getImages(docs);

if (imgsErr) {
  // log the error and return the docs
  // (i.e. send a partial result rather than a complete failure)
} else {
  // return the docs and images
}
```

This paradigm adopts the strengths of the classic error-first signature while fully embracing `async/await` and promises. `try/catch` is an excellent companion to `async/await` and `Promise`, however it lacks nuance when working with complex transactions. It's more like a hammer when working on a chip board. This library is born of painful personal experience from writing the same patterns and boilerplate over and over again in enterprise services.

Multi-return promises are especially useful for loops where `Promise.all` would not return the full list of errors. Instead this is possible:

```js
const [errors, results] = await group([
  getPeople(),
  getCompanies(),
]);

// ... after asserting no errors, destructure to get individual results:
const [people, companies] = results;
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

#### interval: number

Initial time to wait in milliseconds.

Default: `1000`

#### factor: number

Exponential growth factor for `interval`

Default: `2`

#### forever: boolean

Flag to ignore `limit` and have infinite retries.

Default: `false`

#### limit: number

Maximum number of retries.

Default: `10`

#### couldRetry(err, result): function

Test if retry should occur.

Default: `() => true`

## Author

Faraz Syed

## License

MIT