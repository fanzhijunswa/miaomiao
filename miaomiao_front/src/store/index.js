import Vue from 'vue'
import Vuex from 'vuex'
import * as myStroage from '@/libs/util'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    token: ''
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      state.token = userInfo.token
      myStroage.set('userInfo', userInfo)
      myStroage.set('token', userInfo.token)
    },
    removeUserInfo (state) {
      state.userInfo = ''
      state.token = ''
      myStroage.remove('userInfo')
      myStroage.remove('token')
    }
  },
  getters: {
    getUserInfo (state) {
      if (!Object.keys(state.userInfo).length) {
        state.userInfo = myStroage.get('userInfo') 
      }
      return state.userInfo
    },
    getToken (state) {
      if (!state.token) {
        state.token = myStroage.get('token')
      }
      return state.token
    }
  },
})
