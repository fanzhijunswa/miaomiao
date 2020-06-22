import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '~styles/main.sass'
import '@/iconfont/style.css'
import '@/utils/rem'
new Vue({
  router,
  render: createElement => createElement(App)
}).$mount('#app')
