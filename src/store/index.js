import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") == undefined ? "" : localStorage.getItem("token"),  // token
    userName: sessionStorage.getItem("userName") == undefined ? "" : sessionStorage.getItem("userName"),   //用户名
    router: sessionStorage.getItem("updateRouter") == undefined ? [{ deta: true }, { deta: true }, { deta: true }, { deta: true },] : JSON.parse(sessionStorage.getItem("updateRouter")), //管理员权限
  },
  mutations: {
    setToken(xt, xx) {
      xt.token = xx
    },
    userName(state, val) {
      sessionStorage.setItem("userName", val)
      state.userName = val
    },
    updateRouter(state, val) {
      state.router = val
      sessionStorage.setItem("updateRouter", JSON.stringify(val))
    }
  },
  actions: {
  },
  modules: {
  }
})
