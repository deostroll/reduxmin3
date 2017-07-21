import * as actions from "./actions"
import reducers from "./reducers"
import * as selectors from "./selectors"

export default function() {
	return {
		statePlugins: {
			layout: {
				actions,
				reducers,
				selectors
			}
		}
	}
}