import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import devtools from './devtools'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // then we reference it
    devtools
  }
})

// if we want some HMR magic for it, we handle
// the hot update like below. Notice we guard this
// code with "process.env.DEV" -- so this doesn't
// get into our production build (and it shouldn't).
if (process.env.DEV && module.hot) {
  module.hot.accept(['./devtools'], () => {
    const newDevTools = require('./devtools').default
    store.hotUpdate({ modules: { devtools: newDevTools } })
  })
}

export default store
