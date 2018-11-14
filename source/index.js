'use strict'

/**
 * A function that is fired when the pool is ready for it to execute.
 * It can return a promise if it is asynchronous, in which case the pool will only start another task once the promise resolves.
 * @callback Task
 * @returns {Promise|any}
 */

/**
 * Create a PromisePool
 */
class PromisePool {
	/**
	 * Create a new instance of the class with the specified arguments.
	 * @param  {...any} args
	 * @returns {PromisePool}
	 */
	static create (...args) {
		return new this(...args)
	}

	/**
	 * Instantiate the PromisePool with the desired concurrency.
	 * @param {Object} opts
	 * @param {number} opts.concurrency - How many tasks to run at once.
	 * @param {PromiseConstructor} [opts.PromiseClass=Promise] - The Promise class to use. It must support `Promise.resolve().finally(() => {})`. If you are using Node v10 or above, you don't have to do modify this, as the default `Promise` class already supports `.finally`. The alternative to passing in a custom `PromiseClass` would be polyfill the builtin `Promise` class.
	 */
	constructor ({ concurrency, PromiseClass = Promise }) {
		/**
		 * How many tasks to run at once.
		 * @type {number}
		 * @private
		 */
		this.concurrency = concurrency

		/**
		 * The Promise class to use.
		 * It must support `Promise.resolve().finally(() => {})`.
		 * @type {number}
		 * @private
		 */
		this.PromiseClass = PromiseClass

		/**
		 * How many tasks are currently running.
		 * @type {number}
		 * @private
		 */
		this.running = 0

		/**
		 * How many tasks have been started.
		 * @type {number}
		 * @private
		 */
		this.started = 0

		/**
		 * For upcoming tasks, they have a function (a promise resolver) inserted into the queue which starts the task when called.
		 * @type {Array<Function>}
		 * @private
		 */
		this.queue = []
	}

	/**
	 * Add a task to the pool.
	 * @param {Task} task - the task to be executed when the pool permits
	 * @return {Promise} returns a promise that resolves once the task has resolved or rejected
	 */
	open (task) {
		const Promise = this.PromiseClass
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

module.exports = PromisePool
