'use strict'

module.exports = class ArrayPromisePool {
	static create (...args) {
		return new this(...args)
	}

	constructor (concurrency) {
		this.concurrency = concurrency

		/**
		 * @type {Array<Promise>}
		 */
		this.running = []
	}

	/**
	 * Add a task to the pool
	 * @param {Function<Promise>} task
	 * @return {Promise} promise
	 */
	open (task) {
		if (task instanceof Promise) throw new Error('pools only work if you give them a task that executes a promise, not if you give them a promise that is already executing; as such, check the signature of open(...)')
		const p = this.running.length < this.concurrency
			? Promise.resolve().then(task)
			: this.running.shift().finally().then(task)
		this.running.push(p)
		return p
	}
}
