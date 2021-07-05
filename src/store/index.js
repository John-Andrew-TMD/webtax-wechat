import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
// import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
// const vuexPersisted = new createPersistedState({
//   storage: {
//     getItem: key => localStorage.getItem(key),
//     setItem: (key, value) => localStorage.setItem(key, value),
//     removeItem: key => localStorage.removeItem(key)
//   }
// });
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  // plugins: [vuexPersisted]
});
