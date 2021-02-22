import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hostUrl: "http://39.105.58.189/"
    // hostUrl: "https://localhost:5001/"

  },
  // mutations: {
  //   setUser(state, value) {
  //     state.user = value
  //   },
  //   cleanUser(state) {
  //     state.user = null
  //   }
  // },
  // // 异步
  // actions: {
  //   setUserInfo(content, id) {
  //     getUserData(id).then((result) => {
  //       window.sessionStorage.setItem("state",result.data)
  //       content.commit('setUser', result.data)
  //     });
  //   }
  // },
  // modules: {}
});