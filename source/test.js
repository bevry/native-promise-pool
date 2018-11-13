'use strict'

const { deepEqual } = require('assert-helpers')
const joe = require('joe')

const ArrayPromisePool = require('./array.js')
const SetPromisePool = require('./set.js')

const tasks = [
	() => new Promise((resolve) => setTimeout(() => resolve('task 1'), 1000)),
	() => 'task 2',
	() => new Promise((resolve) => setTimeout(() => resolve('task 3'), 1000)),
	() => new Promise((resolve) => setTimeout(() => resolve('task 4'), 1000)),
	() => 'task 5',
	() => 'task 6'
]
const expected = ['task 2', 'task 1', 'task 4', 'task 3', 'task 6', 'task 5']
joe.suite('native-promise-pool', function (suite, test) {
	test('array works', function (done) {
		const pool = ArrayPromisePool.create(2)
		const results = []
		Promise.all(
			tasks.map((task) => pool.open(task).then(function (result) {
				results.push(result)
				console.log(result)
				return result
			}))
		).then(function (results) {
			console.log(results)
			deepEqual(results, expected)
			done()
		})
	})
})
