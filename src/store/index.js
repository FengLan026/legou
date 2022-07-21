import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters"
import address from "./modules/address"
import map from "./modules/map"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    address,
    map
  },
  getters
})

export default store
