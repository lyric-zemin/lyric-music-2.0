import Vue from 'vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import '@/common/style/index.scss'
import App from './App.vue'

Vue.use(VueLazyload, {
  loading: require('@/common/image/default.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
