import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    user: null
  },
  mutations: {
    checkLoginState(state) {
      let token = sessionStorage.getItem("token");
      if (token) {
        state.token = token;
      }

      let user = sessionStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
      }
    },
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    setUser(state, user) {
      state.user = user;
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      state.token = "";
      state.user = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }
  },
  actions: {}
});
