import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router.js'
import store from './store.js'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
