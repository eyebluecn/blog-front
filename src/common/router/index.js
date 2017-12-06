import Vue from 'vue'
import Router from 'vue-router'
import ByIndexView from '../../backyard/index/Index.vue'
import ByFrameView from '../../backyard/Frame.vue'
import UserLogin from '../../backyard/user/Login.vue'
import UserProfile from '../../backyard/user/Profile.vue'
import ArticleList from '../../backyard/article/List.vue'
import ArticleCreate from '../../backyard/article/Create.vue'
import ArticleDetail from '../../backyard/article/Detail.vue'
import WheelIndex from '../../backyard/wheel/Index.vue'
import store from '../vuex/index.js'

Vue.use(Router)


const router = new Router({
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
        },
        {
          path: 'user/login',
          name: 'UserLogin',
          component: UserLogin,
          meta: {
            title: '登录',
            requiresAuth: false,
            breadcrumbs: []
          }
        },
        {
          path: 'user/profile/:uuid',
          name: 'UserProfile',
          component: UserProfile,
          meta: {
            title: '用户详情',
            requiresAuth: true,
            breadcrumbs: []
          }
        },
        {
          path: 'article/list',
          name: 'ArticleList',
          component: ArticleList,
          meta: {
            title: '文章列表',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ArticleList",
                title: "文章列表"
              }
            ]
          }
        },
        {
          path: 'article/create',
          name: 'ArticleCreate',
          component: ArticleCreate,
          meta: {
            title: '新建文章',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ArticleList",
                title: "文章列表"
              },
              {
                name: "ArticleCreate",
                title: "新建文章"
              }
            ]
          }
        },
        {
          path: 'article/edit/:uuid',
          name: 'ArticleEdit',
          component: ArticleCreate,
          meta: {
            title: '编辑文章',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ArticleList",
                title: "文章列表"
              },
              {
                name: "ArticleEdit",
                title: "编辑文章"
              }
            ]
          }
        },
        {
          path: 'article/detail/:uuid',
          name: 'ArticleDetail',
          component: ArticleDetail,
          meta: {
            title: '文章详情',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ArticleList",
                title: "文章列表"
              },
              {
                name: "ArticleDetail",
                title: "文章详情"
              }
            ]
          }
        },
        {
          path: 'wheel',
          name: 'WheelIndex',
          component: WheelIndex,
          meta: {
            title: '自家轮子',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "WheelIndex",
                title: "自家轮子"
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


//add global interceptor.
router.beforeEach((to, from, next) => {

  //handle breadcrumbs things.
  if (to.meta.breadcrumbs) {
    store.state.breadcrumbs = to.meta.breadcrumbs
  } else {
    store.state.breadcrumbs = []
  }

  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '个人博客'
  }

  //handle auth feature.
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.user.role === 'GUEST') {
      next({
        path: '/by/user/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


export default router;
