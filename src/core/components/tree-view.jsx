import React from "react"

// let counter = 1
// let tmr = null

// let reset = function() {
// 	if(tmr) {
// 		clearTimeout(tmr)
// 	}
// 	counter++;
// 	tmr = setTimeout(function() {
// 		console.log('Count:', counter)
// 	})
// }

function hasKeys(keys, obj) {
	return keys.map(k => {
		let exists = Object.keys(obj).indexOf(k) > -1
		return `${k}:${exists}`
	}).toString()
}

export default class TreeView extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		if (this.previousState) {
			let {layoutSelectors } = nextProps
			let prevValue = this.previousState.expand
			let currentValue = layoutSelectors.isExpanded(this.previousState.path)
			console.log('Path:', this.previousState.path.join('.'), 'Result:', currentValue !== prevValue)
			return currentValue !== prevValue
		}
		return false
	}

	setVisibility = (flag) => {
		// console.log('foo')
		let { _path, layoutActions } = this.props
		if (flag) {
			layoutActions.show(_path)
		}
		else {
			layoutActions.hide(_path)
		}

	}

	renderChild() {
		// console.log('render child')
		let { _path, _tree, dataSelectors, getComponent, layoutSelectors } = this.props
		console.log('Render:', _path.join('.'))
		let data = _tree.getIn(_path)
		// console.assert(data, path)
		let paras = data && data.get ? (data.get("paras") ? data.get("paras") : undefined) : undefined

		let expand = layoutSelectors.isExpanded(_path)
		
		let childCount = dataSelectors.childCount(_path)
		// console.log({path: _path, count: childCount, data: data})
		this.previousState = {
			path: _path,
			expand: expand
		}
		let TreeView = getComponent("TreeView")
		// console.log('path:', _path, 'hasChildren:', hasChildren)
		// layoutSelectors.isRoot(_path)
		let hide = () => this.setVisibility(false)
		let show = () => this.setVisibility(true)
		return (
			<div className={ `child ${ _path.length === 1 ? "root" : "" }`}>
				{ data && data.get && data.get("title") ? <h3>{data.get("title")}</h3> : null }
				<small>Children Count:  { childCount }</small>
				{ 
					childCount ? <div className="btn-toolbar" role="toolbar">
									<div className="btn-group" role="group">
											<button type="button" className="btn btn-default btn-xs" onClick={ show }>
												<span className="glyphicon glyphicon-eye-open"></span>
											</button>
											<button type="button" className="btn btn-default btn-xs" onClick={ hide }>
												<span className="glyphicon glyphicon-eye-close"></span>
											</button>
										</div>
									</div> 
								: null
				}
				
				
				{
					(expand && paras) ? paras.map((obj, key) => {
						let thisPath = _path.concat("paras", key)
						return <TreeView _path={ thisPath } _tree={ _tree } key={ `-${thisPath.join('.')}` }/>
					}) : null
				}
			</div>
		)
	}


	renderRoot() {
		// console.log('render root')
		// console.log(this.props)
		let { getState, getComponent } = this.props
		let data = getState().get("data")
		let TV = getComponent("TreeView")
		return (
			<div>
				{
					data.map( (subtree, key) => {
						return (
							<TV _path={ [key] } _tree={ data } key={ `-${key}` } />
						)
					})
				}
			</div>
		)
	}

	render() {
		let { _path, _tree } = this.props

		let isRoot = () => !_path && !_tree

		if (isRoot()) {
			return this.renderRoot()
		}
		else {
			return this.renderChild()
		}
	}
}