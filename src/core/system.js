import { createStore, bindActionCreators } from "redux"
import { combineReducers } from "redux-immutable"
import { fromJS } from "immutable"
import deepExtend from "deep-extend"
import {objReduce, objMap } from "core/utils"

let idFn = (a) => a

export default class Store {
  constructor(opts = {}) {
    
    deepExtend(this, {
      state: {},
      system: {
        components: {},
        statePlugins: {},
        rootInjects: {}
      },
      boundSystem: {}
    }, opts)

    this.getSystem = this._getSystem.bind(this)

    this.store = createStore(idFn, fromJS({
      data: this.state
    }))

    this.buildSystem(false)

    this.register(plugins)

  }

  register(plugins, rebuild=true) {
    let pluginSystem = combinePlugins(plugins, this.getSystem())
    sysExtend(this.system, pluginSystem)
    if(rebuild) {
      this.buildSystem()
    }
  }

  _getSystem() {
    return this.boundSystem;
  }

  buildSystem(buildReducer = true) {
    let dispatch = this.store.dispatch
    let getState = this.store.getState

    this.boundSystem = Object.assign({},
        this.getRootInjects(),
        this.getActions(),
        this.system.rootInjects || {}
      )

    if (buildReducer) {
      this.rebuildReducer()
    }
  }

  rebuildReducer() {
    this.store.replaceReducer(buildReducer(this.system.statePlugins))
  }

  getStore() {
    return this.store
  }

  getRootInjects() {

    return Object.assign({
      getSystem: this.getSystem,
      getStore: this.getStore.bind(this),
      getState: this.store.getState,
      getComponents: this.getComponents.bind(this)
    }, this.system.rootInjects || {})
  }

  getActions() {
    return this.getBoundActions()
  }

  getType(name) {
    let upName = name[0].toUpperCase() + name.slice(1)
    return objReduce(this.system.statePlugins, (val, namespace) => {
      let thing = val[name]
      return { [namespace + upName] : thing }
    })
  }

  getBoundActions() {
    let dispatch = this.store.dispatch

    let actionHolders = this.getType("actions")
    let letAllActions = objMap(actionHolders, (actions) => {
      return objReduce(actions, (action, actionName ) => {
        if (typeof action === "function") {
          return {
            [actionName] : action
          }
        }
      })
    })
    const process = creator => {
      if (typeof creator !== 'function') {
        return objMap(creator, prop => process(prop))
      }

      return (...args) => {
        let action = null
        try {
          action = creator(...args)
        }
        catch(e) {
          return { type: 'ERROR_THROWN', payload: e}
        }
        finally {
          return action
        }
      }
    }
    return objMap( letAllActions, actionCreator => bindActionCreators( process(actionCreator) , dispatch ) )

  }

  getComponents(component) {
    if(typeof component !== "undefined")
      return this.system.components[component]
    return this.system.components
  }

} // end class store

function combinePlugins(plugins, toolbox) {
  
  if (typeof plugins === "object" && !Array.isArray(plugins)) {
    return plugins
  }

  if (typeof plugins === "function") {
    return combinePlugins(plugins(toolbox), toolbox)
  }

  if (Array.isArray(plugins)) {
    return plugins
      .map(plgn => combinePlugins(plgn, toolbox))
      .reduce(sysExtend, {})
  }
}

function sysExtend(dest = {}, src = {}) {
  //we are not doing any of the wrap action stuff...
  return deepExtend(dest, src)
}

function buildReducer(statePlugins) {
  let reducerObj = objMap(statePlugins, sp => {
    return sp.reducers
  })

  return allReducers(reducerObj) 
}

function allReducers(reducerSys) {
  let reducers = Object.keys(reducerSys).reduce((obj, key) => {
    obj[key] = makeReducer(reducerSys[key])
    return obj
  }, {})

  if (!Object.keys(reducers).length) {
    return idFn
  }

  return combineReducers(reducers)
}

function makeReducer(reducerObj) {
  return (state = new Map(), action) => {
    if(!reducerObj)
      return state

    let redFn = reducerObj[action.type]
    if(redFn) {
      return redFn(state, action)
    }
    return state
  }
}

import data from "core/plugins/data"
import view from "core/plugins/view"
import all_components from "core/components/all"
let plugins = [
  view,
  data,
  all_components
]