export * from './vote'
export * from './todo'
export * from './counter'

import * as Lifecycle from 'nuxt-lifecycle'
Lifecycle.onServerPrefetch(async url => {
	console.log('onServerPrefetch start', url)
	await (() => {
		return new Promise(resolve => {
			setTimeout(resolve, 2000)
		})
	})()
	console.log('onServerPrefetch ended')
})

Lifecycle.onClientPrefetch(async url => {
	console.log('onClientPrefetch start', url)
	await (() => {
		return new Promise(resolve => {
			setTimeout(resolve, 2000)
		})
	})()
	console.log('onClientPrefetch ended')
})
