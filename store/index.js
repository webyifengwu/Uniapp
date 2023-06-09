import state from "./state.js"
import actions from "./actions.js"
import mutations from "./mutations.js"
import getters from "./getters.js"
import {createStore} from "vuex"
const store = createStore({
  state,
  actions,
  mutations,
  getters
})
export default store
