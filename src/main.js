// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import $ from 'jquery'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import '@/assets/css/style.css'

import bootstrap from 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'
import common from '@/assets/js/common'
import md5 from '@/assets/js/md5'
import * as baseUrl from '@/assets/js/baseUrl'

Vue.config.productionTip = false;

Vue.prototype.common = common;
Vue.prototype.$hex = md5;
Vue.prototype.$axios = axios;
Vue.prototype.$base = baseUrl;

Vue.use(Vuex);
Vue.use(iView);

const ADD_COUNT = 'ADD_COUNT';
const REMOVE_COUNT = 'REMOVE_COUNT';

const store = new Vuex.Store({
    state: {
        isLogin: false,
        isEditing: false,
        token: "",
        userID: ""
    },
    mutations: {
        // 组件想要对于vuex中的数据进行的处理
        // 组件中采用 this.$store.commit('方法名') 的方式调用，充分显示解耦
        // 内部操作必须在此刻完成（同步）
        [ADD_COUNT] (state, token) {
            localStorage.setItem("token",token);
            state.token = token;
        },
        [REMOVE_COUNT] (state, token) {
            // 退出登录
            localStorage.removeItem("token",token);
            state.token = token;
        }
    },
    getters: {
        certainLogin() {
            console.log(store.state.token);
            return !common.isEmpty(store.state.token);
        },
        isEdit() {
            console.log(store.state.isEditing);
            return store.state.isEditing;
        }
    }
});

router.beforeEach((to, from, next) => {
    store.state.token = localStorage.getItem('token');
    // 获取本地存储的token

    if(to.meta.requireAuth) {
        // 判断该路由是否需要登录权限
        if(to.meta.navTop){
            store.state.isEditing = true;
        }

        if(!common.isEmpty(store.state.token)) {
            next();
            // 通过 store.state.token 获取当前 token是否存在
        }
        else {
            next({
                path: '/Login',
                query: {redirect: to.fullPath}
                // 将跳转的路由 path 作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
