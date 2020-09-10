import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router.js'
import store from './store.js'
import 'bootstrap/dist/css/bootstrap.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

// 后台接口地址
axios.defaults.baseURL='http://10.141.111.165:8080'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
