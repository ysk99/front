import Vue from 'vue'
// import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueJsonp from 'vue-jsonp'
import VueFriendlyIframe from 'vue-friendly-iframe'
import VueAnalytics from 'vue-analytics'
// import Share from 'vue-social-share'
// import 'vue-social-share/dist/client.css';
Vue.component('pagination', require('laravel-vue-pagination'))
Vue.component('vue-friendly-iframe', VueFriendlyIframe)
Vue.use(VueJsonp)
// Vue.use(Share)
Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-135079816-1',
  router
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
