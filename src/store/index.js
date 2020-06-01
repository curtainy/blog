import Vue from 'vue'
import Vuex from 'vuex'

import { getToken } from 'network/storage'
import { myBlog } from 'network/blog'


Vue.use(Vuex)

const state = {
  token: {},
  isLoad: false,
  myBlog: []
}

const mutations = {
  //退出登录
  quit(state){
    state.isLoad = false
    state.token = {}
    state.myBlog = []
  },
  //登录注册
  load(state){
    state.token = getToken()
    state.isLoad = true
    myBlog({username:state.token.username}).then((data) => {
      state.myBlog = data.data
    })
  },
  //添加博客
  addBlog(state,blog){
    state.myBlog.push(blog)
  },
  //删除博客
  cancelBlog(state,title){
    for(let i = 0; i < state.myBlog.length; i++){
      if(state.myBlog[i].title === title){
        state.myBlog.splice(i,1)
        break;
      }
    }
  },
  //修改博客
  modifyBlog(state,blog){
    //删除原来的
    this.commit('cancelBlog',blog.oldTitle)
    delete blog.oldTitle
    //新增修改后的
    this.commit('addBlog',blog)
  }
}


//用户登录状态
if(getToken().username != undefined){
  state.token = getToken()
  state.isLoad = true
  myBlog({username:state.token.username}).then((data) => {
    state.myBlog = data.data
  })
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store