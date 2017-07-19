import System from "core/system"

module.exports = function SampleApp(config) {
	let storeConfig = {
		state: config.data
	}
	
	let store = new System(storeConfig)
	let system = store.getSystem()
	system.render(config.dom_id, "App")
	return system
}