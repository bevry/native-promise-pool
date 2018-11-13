'use strict'

module.exports = class SetPromisePool {
	static create (...args) {
		return new this(...args)
	}

	constructor (concurrency) {
		this.concurrency = concurrency

		/**
		 * @type {Set<Promise>}
		 */
		this.running = new Set()
	}

	/**
	 * Add a task to the pool
	 * @param {Function<Promise>} task
	 * @returns {Promise} promise
	 */
	open (task) {
		let p
		if (this.running.size < this.concurrency) {
			p = Promise.resolve().then(task)
		}
		else {
			const item = this.running.values().next().value
			this.running.delete(item)
			p = item.finally().then(task)
		}
		this.running.add(p)
		return p.finally(() => this.running.delete(p))
	}
}
