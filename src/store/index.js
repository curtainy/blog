import Vue from 'vue'
import Vuex from 'vuex'

import { getToken } from 'network/storage'

Vue.use(Vuex)

const state = {
  token: {},
  isLoad: false
}

const mutations = {
  //退出登录
  quit(state){
    state.isLoad = false
    state.token = {}
  },
  //登录注册
  load(state){
    state.token = getToken()
    state.isLoad = true
  }
}


//用户登录状态
if(getToken().username != undefined){
  state.token = getToken()
  state.isLoad = true
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store