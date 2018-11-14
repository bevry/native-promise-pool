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
	 * @param {PromiseConstructor} [opts.PromiseClass=Promise] - The Promise class to use. It must support `Promise.resolve().finally(() => {})`. If you are using Node v10 or above, you don't have to modify this, as the default `Promise` class already supports `.finally`. An alternative to passing in a custom `PromiseClass`, is to polyfill the builtin `Promise` class.
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
		 * @type {PromiseConstructor}
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
	 * @param {Task} task - The task to be executed when the pool permits.
	 * @return {Promise} Returns a promise that resolves once the task has resolved or rejected. You should `.catch` it in case your task fails.
	 */
	open (task) {
		// Grab the class to use to create our promise,
		// so that the consumer can ensure `.finally` exists.
		const Promise = this.PromiseClass

		// Create our promise and push its resolver to the queue.
		// This has the effect that we can queue its execution for later, instead of right now.
		const p = new Promise((resolve) => this.queue.push(resolve))
			// Once the resolver has fired, update the counts accordingly.
			.finally(() => {
				this.started--
				this.running++
			})
			// Fire our our task and store the result.
			.then(task)
			// Update our counts accordingly, and start the next queue item if there are any.
			.finally(() => {
				this.running--
				if (this.queue.length) {
					this.started++
					this.queue.shift()()
				}
			})

		// If our pool is under capacity, then start the first item in the queue.
		if ((this.running + this.started) < this.concurrency && this.queue.length) {
			this.started++
			this.queue.shift()()
		}

		// Return the the promise that wraps the task,
		// such that it resolves once the task has compelted and our wrappers have completed.
		// This allows the user to do `Promise.all(Array<Task>.map((task) => pool.open(task)))`,
		// so that they can queue something for when all their pooled tasks are completed.
		// It also allows the user to do the mandatory `.catch` handling for task failures.
		return p
	}
}

module.exports = PromisePool
