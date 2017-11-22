import Vue from 'vue'
import Router from 'vue-router'
import Index from '../../backyard/index/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
