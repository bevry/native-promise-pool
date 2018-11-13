'use strict'

const chalk = require('chalk')
const logger = require('logger-clearable').create()

const logs = []
const statuses = {}
function time () {
	const t = new Date()
	return t.getMinutes() + ':' + t.getSeconds() + ':' + t.getMilliseconds()
}
function status (i, status) {
	logs.push(status)
	statuses[i] = status
	logger.log(
		// '== LOGS ==\n' +
		// logs.join('\n') +
		// '\n\n' +
		'== STATUS ===\n' +
		Object.values(statuses).join('\n')
	)
}
function message (heading, message) {
	logger.log(
		// '== LOGS ==\n' +
		// logs.join('\n') +
		// '\n\n' +
		'== STATUS ===\n' +
		Object.values(statuses).join('\n') +
		'\n\n' +
		`== ${heading} ===\n` +
		message
	)
}

const concurrency = 3
const tasks = 10
const delay = 1000

const PromisePool = require('./')
const pool = new PromisePool(concurrency)

Promise.all(
	Array(10).fill(null).map((value, i) => pool.open(() => new Promise(function (resolve) {
		const name = `Task ${i}\t\tdelay ${delay}ms`
		status(i, time() + '\t' + chalk.green('started') + '\t\t' + name)
		setTimeout(function () {
			status(i, time() + '\t' + chalk.red('finished') + '\t' + name)
			resolve(name)
		}, delay)
	})).then(function (result) {
		status(i, time() + '\t' + chalk.blue('result') + '\t\t' + result)
		return result
	})
	)
).then((results) => message('DONE', results.join('\n')))
