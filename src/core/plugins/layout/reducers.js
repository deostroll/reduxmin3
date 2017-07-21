import { HIDE_NODE, SHOW_NODE } from "./actions"

const str = s => `-${s.join('.')}`
export default {
	[HIDE_NODE]: (state, {payload}) => {
		// payload = payload.slice().unshift('-')
		return state.set(str(payload), false)
	},

	[SHOW_NODE] : (state, {payload}) => {
		// console.log('reducer:', state)
		// payload = payload.slice().unshift('-')
		return state.set(str(payload), true)
	},
}