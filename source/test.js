'use strict'

const { equal, deepEqual } = require('assert-helpers')
const joe = require('joe')

const PromisePool = require('./all.js')

const tasks = [
	() => new Promise((resolve) => setTimeout(() => resolve('task 1'), 1000)),
	() => 'task 2',
	() => new Promise((resolve) => setTimeout(() => resolve('task 3'), 1000)),
	() => new Promise((resolve) => setTimeout(() => resolve('task 4'), 1000)),
	() => 'task 5',
	() => 'task 6'
]
const expectedOL = ['task 1', 'task 2', 'task 3', 'task 4', 'task 5', 'task 6']
const expectedUL = ['task 2', 'task 1', 'task 3', 'task 5', 'task 6', 'task 4']

joe.suite('native-promise-pool', function (suite, test) {
	test('array works', function (done) {
		const pool = PromisePool.create(2)
		const ul = []
		Promise.all(
			tasks.map((task) => pool.open(task).then(function (result) {
				ul.push(result)
				console.log(result)
				return result
			}))
		).then(function (ol) {
			deepEqual(ol, expectedOL, 'ordered results')
			deepEqual(ul, expectedUL, 'unordered results')
			equal(pool.running, 0, 'running is empty')
			equal(pool.started, 0, 'started is empty')
			deepEqual(pool.queue, [], 'queue is empty')
			done()
		})
	})
})
