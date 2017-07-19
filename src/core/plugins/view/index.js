import { render, getComponent } from "./root-injects"

export default function({getComponents, getStore, getSystem}) {
	return {
		rootInjects : {
			getComponent,
			render: render.bind(null, getSystem, getStore, getComponent, getComponents)
		}
	}
}