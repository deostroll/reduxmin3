import React, { Component } from "react"
import ReactDOM from "react-dom"
import { connect, Provider } from "react-redux"

export const getComponent = (getSystem, getStore, getComponents, componentName, container) => {

  if(typeof componentName !== "string")
    throw new TypeError("Need a string, to fetch a component. Was given a " + typeof componentName)

  let component = getComponents(componentName)

  if(!component) {
    getSystem().log.warn("Could not find component", componentName)
    return null
  }

  if(!container)
    return wrapRender(component)

  if(container === "root")
    return makeContainer(getSystem, component, getStore())

  // container == truthy
  return makeContainer(getSystem, component)
}

const wrapRender = (component) => {
  const isStateless = component => !(component.prototype && component.prototype.isReactComponent)

  const target = isStateless(component) ? createClass(component) : component

  const ori = target.prototype.render

  target.prototype.render = function render(...args) {
    try {
      return ori.apply(this, args)
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      return <Fallback error={error} name={target.name} />
    }
  }

  return target
}

const createClass = component => React.createClass({
  render() {
    return component(this.props)
  }
})

const Fallback = ({ name }) => <div style={{ // eslint-disable-line react/prop-types
    padding: "1em",
    "color": "#aaa"
  }}>😱 <i>Could not render { name === "t" ? "this component" : name }, see the console.</i></div>

export const render = (getSystem, getStore, getComponent, getComponents, dom) => {
  let domNode = document.querySelector(dom)
  let App = (getComponent(getSystem, getStore, getComponents, "App", "root"))
  ReactDOM.render(( <App/> ), domNode)
}

const SystemWrapper = (getSystem, ComponentToWrap ) => class extends Component {
  render() {
    return <ComponentToWrap {...getSystem() } {...this.props} {...this.context} />
  }
}

const RootWrapper = (reduxStore, ComponentToWrap) => class extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <ComponentToWrap {...this.props} {...this.context} />
      </Provider>
    )
  }
}

const makeContainer = (getSystem, component, reduxStore) => {
  let wrappedWithSystem = SystemWrapper(getSystem, component, reduxStore)
  let connected = connect(state => ({state}))(wrappedWithSystem)
  if(reduxStore)
    return RootWrapper(reduxStore, connected)
  return connected
}