import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from 'axios'
import '~styles/main.sass'
import '@/iconfont/style.css'
import '@/utils/rem'
import * as filters from '@/utils/filter'
import { sleep } from '@/utils/sleep'
import { Swipe, SwipeItem, PullRefresh, Toast, List } from 'vant'
Vue.prototype.$http = axios
Vue.prototype.$toast = Toast
Vue.prototype.$sleep = sleep
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(PullRefresh)
Vue.use(List)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
axios.defaults.baseURL = '/api'
new Vue({
  router,
  render: createElement => createElement(App)
}).$mount('#app')
