import Vue from 'vue'
import Router from 'vue-router'
import ByFrameView from '../../backyard/Frame.vue'
import UserLogin from '../../backyard/user/Login.vue'
import UserList from '../../backyard/user/List'
import UserDetail from '../../backyard/user/Detail'
import UserChangePassword from '../../backyard/user/ChangePassword'
import UserCreate from '../../backyard/user/Create'
import ArticleList from '../../backyard/article/List.vue'
import ArticleCreate from '../../backyard/article/Create.vue'
import ArticleDetail from '../../backyard/article/Detail.vue'
import TagList from '../../backyard/tag/List'
import TagCreate from '../../backyard/tag/Create'
import PreferenceIndex from '../../backyard/preference/Index'
import PreferenceEdit from '../../backyard/preference/Edit'
import ReportList from '../../backyard/report/List'
import NotFound from '../../backyard/layout/NotFound'
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
          name: 'ArticleList',
          component: ArticleList,
          meta: {
            title: '文章列表',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'ArticleList',
                title: '文章列表'
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
                name: 'ArticleList',
                title: '文章列表'
              },
              {
                name: 'ArticleCreate',
                title: '新建文章'
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
                name: 'ArticleList',
                title: '文章列表'
              },
              {
                name: 'ArticleEdit',
                title: '编辑文章'
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
                name: 'ArticleList',
                title: '文章列表'
              },
              {
                name: 'ArticleDetail',
                title: '文章详情'
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
          path: 'user/list',
          name: 'UserList',
          component: UserList,
          meta: {
            title: '用户列表',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'UserList',
                title: '用户列表'
              }
            ]
          }
        },
        {
          path: 'user/detail/:uuid',
          name: 'UserDetail',
          component: UserDetail,
          meta: {
            title: '用户详情',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'UserList',
                title: '用户列表'
              },
              {
                name: 'UserDetail',
                title: '用户详情'
              }
            ]
          }
        },
        {
          path: 'user/change/password',
          name: 'UserChangePassword',
          component: UserChangePassword,
          meta: {
            title: '修改密码',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'UserChangePassword',
                title: '修改密码'
              }
            ]
          }
        },
        {
          path: 'user/create',
          name: 'UserCreate',
          component: UserCreate,
          meta: {
            title: '创建用户',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'UserList',
                title: '用户列表'
              },
              {
                name: 'UserCreate',
                title: '创建用户'
              }
            ]
          }
        },
        {
          path: 'user/edit/:uuid',
          name: 'UserEdit',
          component: UserCreate,
          meta: {
            title: '编辑用户',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'UserList',
                title: '用户列表'
              },
              {
                name: 'UserEdit',
                title: '编辑用户'
              }
            ]
          }
        },
        {
          path: 'tag/list',
          name: 'TagList',
          component: TagList,
          meta: {
            title: '标签列表',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'TagList',
                title: '标签列表'
              }
            ]
          }
        },
        {
          path: 'tag/create',
          name: 'TagCreate',
          component: TagCreate,
          meta: {
            title: '新建标签',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'TagList',
                title: '标签列表'
              },
              {
                name: 'TagCreate',
                title: '新建标签'
              }
            ]
          }
        },
        {
          path: 'tag/edit/:uuid',
          name: 'TagEdit',
          component: TagCreate,
          meta: {
            title: '编辑标签',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'TagList',
                title: '标签列表'
              },
              {
                name: 'TagEdit',
                title: '编辑标签'
              }
            ]
          }
        },
        {
          path: 'preference',
          name: 'PreferenceIndex',
          component: PreferenceIndex,
          meta: {
            title: '网站偏好',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'PreferenceIndex',
                title: '网站偏好'
              }
            ]
          }
        },
        {
          path: 'preference/edit',
          name: 'PreferenceEdit',
          component: PreferenceEdit,
          meta: {
            title: '网站偏好设置',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'PreferenceIndex',
                title: '网站偏好'
              }, {
                name: 'PreferenceEdit',
                title: '网站偏好设置'
              }
            ]
          }
        },
        {
          path: 'report/list',
          name: 'ReportList',
          component: ReportList,
          meta: {
            title: '举报列表',
            requiresAuth: true,
            breadcrumbs: [
              {
                name: 'ReportList',
                title: '举报列表'
              }
            ]
          }
        },
        //未被上面处理的route被视为404
        {
          path: '*',
          component: NotFound,
          meta: {requiresAuth: false}
        }
      ]
    },
    {
      path: '/',
      component: ByFrameView,
      children: [
        //未被上面处理的route被视为404
        {
          path: '*',
          component: NotFound,
          meta: {requiresAuth: false}
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

export default router
