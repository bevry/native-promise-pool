'use strict'

const PromisePool = require('./')

function time () {
	const t = new Date()
	return t.getMinutes() + ':' + t.getSeconds() + ':' + t.getMilliseconds()
}

const pool = new PromisePool(2)

for (let i = 0; i < 10; i++) {
	setTimeout(function () {
		for (let ii = 0; ii < 10; ii++) {
			pool.open(() => new Promise(function (resolve) {
				const delay = ii * 100
				const name = `Task ${i}:${ii}\tdelay ${delay}ms`
				console.log(time(), '\tstarted\t\t', name)
				setTimeout(function () {
					console.log(time(), '\tfinished\t', name)
					resolve(name)
				}, delay)
			})).then(function (result) {
				console.log(time(), '\tresult\t\t', result)
			})
		}
	}, i * 1000)
}
