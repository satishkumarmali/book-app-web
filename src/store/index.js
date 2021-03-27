import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth
  }
});

// Initial state
const initialState = JSON.parse(JSON.stringify(store.state));

//Resets the store when user logs out
const resetStore = () => {
  store.replaceState(JSON.parse(JSON.stringify(initialState)));
};

export default store;
export { resetStore };
