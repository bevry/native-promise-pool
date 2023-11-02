'use strict'

// Import
const ansi = require('@bevry/ansi')
const logger = require('logger-clearable').create()
const PromisePool = require('../').default

// Prepare
const concurrency = 3
const tasks = 10
const delay = 1000
const pool = new PromisePool(concurrency)

// Helpers
const logs = []
const statuses = {}
function time() {
	const t = new Date()
	return t.getMinutes() + ':' + t.getSeconds() + ':' + t.getMilliseconds()
}
function status(i, status) {
	logs.push(status)
	statuses[i] = status
	logger.log(
		// '== LOGS ==\n' +
		// logs.join('\n') +
		// '\n\n' +
		'== STATUS ===\n' + Object.values(statuses).join('\n'),
	)
}
function message(heading, message) {
	logger.log(
		// '== LOGS ==\n' +
		// logs.join('\n') +
		// '\n\n' +
		'== STATUS ===\n' +
			Object.values(statuses).join('\n') +
			'\n\n' +
			`== ${heading} ===\n` +
			message,
	)
}

// Example
Promise.all(
	Array(tasks)
		.fill(null)
		.map((value, i) =>
			pool
				.open(
					() =>
						new Promise(function (resolve) {
							const name = `Task ${i}\t\tdelay ${delay}ms`
							status(i, time() + '\t' + ansi.green('started') + '\t\t' + name)
							setTimeout(function () {
								status(i, time() + '\t' + ansi.red('finished') + '\t' + name)
								resolve(name)
							}, delay)
						}),
				)
				.then(function (result) {
					status(i, time() + '\t' + ansi.blue('result') + '\t\t' + result)
					return result
				}),
		),
).then((results) => message('DONE', results.join('\n')))
