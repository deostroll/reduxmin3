import { createSelector } from "reselect"
import { fromJS, Set, Map, OrderedMap, List } from "immutable"

const state = state => state || Map()

export const isExpanded = (state, path) => {
	// path.unshift('-')
	let join = `-${path.join('.')}`
	// console.log(join)
	// console.log(state.get(join))
	return !!state.get(join)
}

export const isRoot = (_, path) => {
	// console.log(path, path.length === 2)
	return path.length === 1
}