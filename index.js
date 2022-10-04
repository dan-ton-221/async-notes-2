/*
Using the fetch() API

Promises are the foundation of asynchronous programming in modern JavaScript. 
A promise is an object returned by an asynchronous function, which represents the 
current state of the operation. At the time the promise is returned to the caller,
the operation often isn't finished, but the promise object provides methods to handle 
the eventual success or failure of the operation.

const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

console.log(fetchPromise);

fetchPromise.then((response) => {
  console.log(`Received response: ${response.status}`);
});

console.log("Started request…");


1. calling the fetch() API, and assigning the return value to the fetchPromise variable

2. immediately after, logging the fetchPromise variable. This should output something like:
Promise { <state>: "pending" }, telling us that we have a Promise object, and it has a 
state whose value is "pending". The "pending" state means that the fetch operation is still 
going on.

3. passing a handler function into the Promise's then() method. When (and if) the fetch operation 
succeeds, the promise will call our handler, passing in a Response object, which contains the 
server's response.

4. logging a message that we have started the request.

completed outcome:
Promise { <state>: "pending" }
Started request…
Received response: 200


Chaining promises:

const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
  .then((response) => response.json())
  .then((data) => {
    console.log(data[0].name);
  });

This is promise chaining, means we can avoid ever-increasing levels of indentation when we need to make consecutive 
asynchronous function calls.


Catching Errors:

To support error handling, Promise objects provide a catch() method. This is a lot like then(): you call it 
and pass in a handler function. However, while the handler passed to then() is called when the asynchronous 
operation succeeds, the handler passed to catch() is called when the asynchronous operation fails.

If you add catch() to the end of a promise chain, then it will be called when any of the asynchronous function 
calls fails. So you can implement an operation as several consecutive asynchronous function calls, and have a 
single place to handle all errors.

const fetchPromise = fetch('bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  })
  .catch((error) => {
    console.error(`Could not get products: ${error}`);
  });


Promise Terminology:

First, a promise can be in one of three states:

-pending: the promise has been created, and the asynchronous function it's associated with has not succeeded or failed yet. 
This is the state your promise is in when it's returned from a call to fetch(), and the request is still being made.

-fulfilled: the asynchronous function has succeeded. When a promise is fulfilled, its then() handler is called.

-rejected: the asynchronous function has failed. When a promise is rejected, its catch() handler is called.

Combining multiple promises:

The Promise.all() method is what you need here. It takes an array of promises and returns a single promise.

const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((response) => {
    console.log(`${response.url}: ${response.status}`);
  })
  .catch((error) => {
    console.error(`Failed to fetch: ${error}`)
  });

  async and await:

  Inside an async function, you can use the await keyword before a call to a function that returns a promise. 
  This makes the code wait at that point until the promise is settled, at which point the fulfilled value of the 
  promise is treated as a return value, or the rejected value is thrown.

  async function fetchProducts() {
  try {
    const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

const promise = fetchProducts();
promise.then((data) => console.log(data[0].name));