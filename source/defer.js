'use strict'

module.exports = function defer () {
	let extension
	const deferred = new Promise(function (resolve, reject) {
		extension = { resolve, reject }
	})
	Object.assign(deferred, extension)
	return deferred
}
