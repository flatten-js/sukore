import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { apolloProvider } from './apollo'
import VueLazyLoad from 'vue-lazyload'
import './registerServiceWorker'
import 'normalize.css'
import '@/assets/css/root.css'

Vue.use(VueLazyLoad, {
  preLoad: 1.25,
  attempt: 1,
  lazyComponent: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
