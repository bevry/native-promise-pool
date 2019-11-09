'use strict'

const { equal, deepEqual } = require('assert-helpers')
const kava = require('kava')

const PromiseClass = Promise.prototype.finally ? Promise : require('bluebird')
const PromisePool = require('./index.js')

const pools = 2
const concurrency = 2

const tasks = [
	() => new Promise(resolve => setTimeout(() => resolve('task 1'), 1000)),
	() => 'task 2',
	() => new Promise((resolve, reject) => reject('intended rejection')),
	() => new Promise(resolve => setTimeout(() => resolve('task 3'), 1000)),
	() => new Promise(resolve => setTimeout(() => resolve('task 4'), 1000)),
	() => 'task 5',
	() => 'task 6'
]
const expectedOL = [
	'task 1',
	'task 2',
	'intended rejection',
	'task 3',
	'task 4',
	'task 5',
	'task 6'
]
const expectedUL = [
	'task 2',
	'intended rejection',
	'task 1',
	'task 3',
	'task 5',
	'task 6',
	'task 4'
]

kava.suite('native-promise-pool', function(suite, test) {
	const pool = PromisePool.create({ concurrency, PromiseClass })
	suite('works', function(suite, test) {
		for (let i = 0; i < pools; ++i) {
			test(`pool ${i}`, function(done) {
				const ul = []
				Promise.all(
					tasks.map(task =>
						pool
							.open(task)
							.then(function(result) {
								ul.push(result)
								console.log(result)
								return result
							})
							.catch(function(err) {
								ul.push(err.message || err)
								console.error(err)
								return err
							})
					)
				).then(function(ol) {
					deepEqual(ol, expectedOL, 'ordered results')
					deepEqual(ul, expectedUL, 'unordered results')
					equal(pool.running, 0, 'running is empty')
					equal(pool.started, 0, 'started is empty')
					deepEqual(pool.queue, [], 'queue is empty')
					done()
				})
			})
		}
	})
})
