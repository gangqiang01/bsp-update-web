// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import swal from 'sweetalert'
import Cookies from './assets/js/cookie'
import _g from './assets/js/global'
import store from './vuex/store'
import moment from 'moment';
import filter from './assets/js/filter'
import {i18n, vueI18n} from './lang/lang'
import SparkMD5 from 'spark-md5'

import {cancelArr} from "./assets/js/baseApi"

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import './assets/css/base.scss';
import './assets/css/global.scss';
import VueCropper from 'vue-cropper';
import 'default-passive-events'


// window.swal = swal;
window.cookie = Cookies;
window._g = _g;
window.store = store;
// window.router = router;
// window.moment = moment;

Vue.prototype.$moment = moment;
Vue.prototype.$sparkMD5 = new SparkMD5();
Vue.prototype.$swal = swal;

router.beforeEach((to, from, next) => {
    while(cancelArr.length>0){
        cancelArr.shift().cancel();
    }
    
    next();
})

Vue.use(ElementUI)
Vue.use(VueCropper)


vueI18n(Vue)

/* eslint-disable no-new */
let vueMain = new Vue({
    el: '#app',
    router,
    store,
    filter,
    i18n,
    template: '<router-view></router-view>'
})
export default vueMain