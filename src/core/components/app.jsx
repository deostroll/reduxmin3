import React from "react"

export default class App extends React.Component {
	render() {
		console.log('Render App')
		let { getState, getComponent } = this.props
		let TreeView = getComponent("TreeView", true)

		return (
			<div className="container">
				<h2>Sample App</h2>

				<TreeView/>
			</div>
		)
	}
}