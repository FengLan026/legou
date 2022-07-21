const state = {
  currentAddress: {}
}
const mutations = {
  setCurrentAddress(state, currentAddress) {
    state.currentAddress = currentAddress
  }
}
const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
