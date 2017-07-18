import { createStore, bindActionCreators } from "redux"
import { fromJS } from "immutable"
import deepExtend from "deep-extend"
import {objReduce } from "core/utils"

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

    this.store = createStore(idFn, fromJS(this.state))

    this.buildSystem(false)

  }

  _getSystem() {
    return this.boundSystem;
  }

  buildSystem(buildReducer = true) {
    let dispatch = this.store.dispatch
    let getState = this.stote.getState

    this.boundSystem = Object.assign({},
        this.getRootInjects(),
        this.getActions()
      )
  }

  getStore() {
    return this.store
  }

  getRootInjects() {

    // TODO: write an implementation of getComponent

    return Object.assign({
      getSystem: this.getSystem,
      getStore: this.getStore,
      getState: this.store.getState
    }, this.system.rootInjects || {})
  }

  getActions() {

  }

  getType(name) {
    let upName = name[0].toUpperCase() + name.slice(1)
    return objReduce(this.system.statePlugins, (val, namespace) => {
      let thing = val[name]
      return { [namespace + upName] : thing }
    })
  }

  getBoundActions() {
    let letAllActions = this.getType("actions")
    return objMap()
  }


}


import data from "core/plugins/data"

let plugins = [
  data
]
