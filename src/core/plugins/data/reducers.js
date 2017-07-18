import { UPDATE, RESET } from "./actions"
import { Map } from "immutable"

export default {
	[UPDATE] : (state = new Map(), { payload: { path, value }}) => {
		return state.setIn(path, value)
	},

	[RESET] : (state = new Map(), {payload}) => {
		if (payload) {
			state.set("json")
		}

		let json = state.get("json")

	}
}