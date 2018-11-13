'use strict'

const PromisePool = require('./')

function time () {
	return new Date().toLocaleTimeString()
}

const pool = new PromisePool(2)

for (let i = 0; i < 5; i++) {
	pool.open(() => new Promise(function (resolve) {
		const name = `Task ${i + 1}`
		const delay = 5000
		console.log(time(), `${name} started`)
		setTimeout(function () {
			console.log(time(), `${name} finished`)
			resolve(`${name} result`)
		}, delay)
	})).then(function (result) {
		console.log(time(), result)
	})
}
