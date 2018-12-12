//For IE Exception.
import "babel-polyfill";
//custom directive.
import "./common/directive/directive"

import Vue from 'vue'
import App from './App.vue'
import store from './common/vuex'

import router from './common/router'
import {sync} from 'vuex-router-sync'
import VueResource from 'vue-resource'
import NProgress from 'vue-nprogress'
import filters from './common/filter'
import Element from 'element-ui';
//自定义文本框插件
import CopyPlugin from "./common/plugin/copy/CopyPlugin";
import PhotoSwipePlugin from "./common/plugin/photoswipe/PhotoSwipePlugin";


//expose to global.
Vue.store = store;
//expose to global.
Vue.router = router;
sync(store, router)
Vue.use(VueResource)
Vue.http.options.root = store.state.host;
Vue.use(NProgress)



//全量引入饿了么组件。
Vue.use(Element, {size: 'small', zIndex: 3000});

//使用自定义插件
Vue.use(new CopyPlugin())
Vue.use(new PhotoSwipePlugin())

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


const nprogress = new NProgress({parent: '.nprogress-container'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  nprogress,
  store,
  router,
  template: "<app/>",
  components: {App}
})
