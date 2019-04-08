// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'
import bootstrap from 'bootstrap/dist/js/bootstrap.min'
import '@/assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'
import common from '@/assets/js/common'
import * as baseUrl from '@/assets/js/baseUrl'


Vue.config.productionTip = false;

Vue.prototype.common = common;
Vue.prototype.$axios = axios;
Vue.prototype.$base = baseUrl;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
