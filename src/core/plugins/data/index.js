import reducers from "./reducers"
import * as actions from "./actions"

export default function() {
	return {
		statePlugins: {
			data: {
				actions,
				reducers
			}
		}
	}
}