const state = {
  user: null
};
const mutations = {
  SET_USER(state, data) {
    state.user = data;
  },
  UPDATE_USER(state, data) {
    state.user.name = data.name;
    state.user.email = data.email;
  }
};
const getters = {
};
export default {
  namespaced: true,
  state,
  mutations,
  getters
};
