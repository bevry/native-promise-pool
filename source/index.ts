/** Promise Pool */
export default class PromisePool<Result extends any> {
	/** How many tasks to run at once. */
	public concurrency: number

	/** How many tasks are currently running. */
	public running: number

	/** How many tasks have been started. */
	public started: number

	/** For upcoming tasks, they have a function (a promise resolver) inserted into the queue which starts the task when called. */
	protected readonly queue: Array<Function>

	/** Instantiate the PromisePool with the desired concurrency. */
	constructor(concurrency: number) {
		this.concurrency = concurrency
		this.running = 0
		this.started = 0
		this.queue = []
	}

	/** Add a task to the pool. */
	open(task: () => Promise<Result> | Result): Promise<Result> {
		// Create our promise and push its resolver to the queue.
		// This has the effect that we can queue its execution for later, instead of right now.
		const p = new Promise<Result>((resolve) => this.queue.push(resolve))
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
					const resolver = this.queue.shift() as Function
					resolver()
				}
			})

		// If our pool is under capacity, then start the first item in the queue.
		if (this.running + this.started < this.concurrency && this.queue.length) {
			this.started++
			const resolver = this.queue.shift() as Function
			resolver()
		}

		// Return the the promise that wraps the task,
		// such that it resolves once the task has compelted and our wrappers have completed.
		// This allows the user to do `Promise.all(Array<Task>.map((task) => pool.open(task)))`,
		// so that they can queue something for when all their pooled tasks are completed.
		// It also allows the user to do the mandatory `.catch` handling for task failures.
		return p
	}
}
