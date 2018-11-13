'use strict'

const chalk = require('chalk')
const PromisePool = require('./')

function time () {
	const t = new Date()
	return t.getMinutes() + ':' + t.getSeconds() + ':' + t.getMilliseconds()
}

const pool = new PromisePool(2)

for (let i = 0; i < 10; i++) {
	pool.open(() => new Promise(function (resolve) {
		const delay = 10000
		const name = `Task ${i}\t\tdelay ${delay}ms`
		console.log(time(), '\t' + chalk.green('started') + '\t\t' + name)
		setTimeout(function () {
			console.log(time(), '\t' + chalk.red('finished') + '\t' + name)
			resolve(name)
		}, delay)
	})).then(function (result) {
		console.log(time(), '\t' + chalk.blue('result') + '\t\t' + result)
	})
}
