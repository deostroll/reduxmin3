import React from "react"

export default class App extends React.Component {
	render() {
		let { getState } = this.props
		console.log(getState().toJS())
		return (
			<div class="container">
				<h2>Sample React/Redux App</h2>
			</div>
		)
	}
}