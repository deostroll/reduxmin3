import System from "core/system"

module.exports = function SampleApp(config) {

	let system = new System(config.data)
	system.render(config.dom_id, "App")
	return system
}