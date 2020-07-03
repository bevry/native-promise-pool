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
			console.log(value + ' done')
			resolve(value + ' result')
		}, 3000)
	})
}

// Async/await wrapper
async function batch(batchName) {
	// add three tasks to the pool, running sequentially for the batch
	const results = [
		await pool.open(() => wait(`${batchName} task 1`)),
		await pool.open(() => wait(`${batchName} task 2`)),
		await pool.open(() => wait(`${batchName} task 3`)),
	]
	console.log(`${batchName} compelted with:\n\t${results.join('\n\t')}`)
}

// Wrap
batch('batch 1')
batch('batch 2')
batch('batch 3')
