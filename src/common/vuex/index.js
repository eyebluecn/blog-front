import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
