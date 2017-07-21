import { createSelector } from "reselect"
import { fromJS, Set, Map, OrderedMap, List } from "immutable"

const state = (state) => state || Map()
const idFn = a => a
// export const getState = createSelector(state, state => state)

export const childCount = (state, path) => {
	let tree = state.getIn(path)
	return tree && tree.get("paras") && tree.get("paras").size || 0
}
