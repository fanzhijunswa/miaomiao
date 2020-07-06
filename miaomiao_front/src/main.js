import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from 'axios'
import '~styles/main.sass'
import '@/iconfont/style.css'
import '@/utils/rem'
import * as filters from '@/utils/filter'
import store from '@/store'
import { sleep } from '@/utils/sleep'
import { Swipe, SwipeItem, PullRefresh, Toast, List, Form, Field, Button, Notify, Rate } from 'vant'
Vue.prototype.$http = axios
Vue.prototype.$toast = Toast
Vue.prototype.$sleep = sleep
Vue.use(Swipe)
Vue.use(Rate)
Vue.use(SwipeItem)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Notify)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
axios.defaults.baseURL = '/api'
new Vue({
  router,
  store,
  render: createElement => createElement(App)
}).$mount('#app')
