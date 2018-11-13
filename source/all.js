'use strict'

module.exports = class ArrayPromisePool {
	static create (...args) {
		return new this(...args)
	}

	constructor (concurrency) {
		this.concurrency = concurrency
		this.running = 0
		this.started = 0
		this.queue = []
	}

	/**
	 * Add a task to the pool
	 * @param {Function<Promise>} task
	 * @return {Promise} promise
	 */
	open (task) {
		const p = new Promise((resolve) => this.queue.push(resolve))
			.finally(() => {
				this.started--
				this.running++
			})
			.then(task)
			.finally(() => {
				this.running--
				if (this.queue.length) {
					this.started++
					this.queue.shift()()
				}
			})

		if ((this.running + this.started) < this.concurrency && this.queue.length) {
			this.started++
			this.queue.shift()()
		}

		return p
	}
}
