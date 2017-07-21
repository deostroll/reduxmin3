import { render, getComponent } from "./root-injects"
import memoize from "lodash/memoize"

export default function({getComponents, getStore, getSystem}) {
	let memgetComponent = memoize(getComponent.bind(null, getSystem, getStore, getComponents))
	return {
		rootInjects : {
			getComponent: memgetComponent,
			render: render.bind(null, getSystem, getStore, getComponent, getComponents)
		}
	}
}