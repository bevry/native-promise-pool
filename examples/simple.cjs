'use strict'

// Import
const PromisePool = require('../').default

// create a pool doing 2 tasks at a time
const pool = new PromisePool(2)

// take a value
// return a promise
// wait 3 seconds
// log the value
// and resolve the promise with the value
function wait(value) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			console.log(value)
			resolve(value)
		}, 3000)
	})
}

// add three tasks to the pool, and log on completion of the batch
Promise.all([
	pool.open(() => wait('first task result')),
	pool.open(() => wait('second task result')),
	pool.open(() => wait('third task result')),
])
	.then((results) => console.log('first batch done with', results))
	.catch(console.error)

// add three tasks to the pool, and log on completion of the batch
Promise.all([
	pool.open(() => wait('fourth task result')),
	pool.open(() => wait('fifth task result')),
	pool.open(() => wait('sixth task result')),
])
	.then((results) => console.log('second batch done with', results))
	.catch(console.error)
