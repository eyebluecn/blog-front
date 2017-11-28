import Vue from 'vue'
import Router from 'vue-router'
import ByIndexView from '../../backyard/index/Index.vue'
import ByFrameView from '../../backyard/Frame.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-link-active',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/by',
      component: ByFrameView,
      children: [
        {
          path: '',
          name: 'byIndexDefault',
          component: ByIndexView,
          meta: {
            title: '个人博客管理系统',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'byIndexDefault',
                title: '首页'
              }
            ]
          }
        },
        {
          path: 'index',
          name: 'byIndex',
          component: ByIndexView,
          meta: {
            title: '个人博客管理系统',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'byIndex',
                title: '首页'
              }
            ]
          }
        }
      ]
    },
    {
      path: '/',
      component: ByFrameView,
      children: [
        {
          path: '',
          name: 'IndexDefault',
          component: ByIndexView,
          meta: {
            title: '个人博客管理系统',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'byIndexDefault',
                title: '首页'
              }
            ]
          }
        },
        {
          path: 'index',
          name: 'Index',
          component: ByIndexView,
          meta: {
            title: '个人博客管理系统',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'byIndex',
                title: '首页'
              }
            ]
          }
        }
      ]
    }
  ]
})
