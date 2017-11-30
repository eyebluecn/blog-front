import Vue from 'vue'
import Vuex from 'vuex'
import User from "../model/user/User";

Vue.use(Vuex)

let user = new User()
user.renderFromLocalStorage()

const state = {
  config: {
    mobile: false,
    showDrawer: true
  },
  debug: true,

  host: '/api',

  //当前版本信息。
  version: {
    identifier: 'cn.zicla.blog',
    platform: 'WEB',
    versionCode: '1',
    versionName: '1.0'
  },

  //当前用户，即使没有登录依然有游客的用户在。
  user,

  breadcrumbs: null

}

const getters = {
  getConfig(state) {
    return state.config
  }
}

const mutations = {}

const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
