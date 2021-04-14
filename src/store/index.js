import Vue from 'vue'
import Vuex from 'vuex'

import { getToken,updateToken } from 'network/storage'
// import { noPubBlog ,allBlog } from 'network/blog'



Vue.use(Vuex)

const state = {
  token: {},
  isLoad: false,
}


//用户登录状态
if(getToken().username != undefined){
  state.token = getToken()
  state.isLoad = true
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
  },
  // //提交评论
  // publishComment(state,payload){
  //   console.log(payload)
  //   state.allBlog.forEach(blog => {
  //     if(blog.username === payload.username && blog.title === payload.title){
  //       blog.comment.push(payload.comment)
  //     }
  //   })
  // },
  // //回复评论
  // responseComment(state,payload){
  //   state.allBlog.forEach(blog => {
  //     if(blog.username === payload.username && blog.title === payload.title){
  //       blog.comment[payload.index].response.push(payload.comment)
  //     }
  //   })
  // },
  // //增加博客访问量
  // addBrowse(state,payload){
  //   state.allBlog.forEach(blog => {
  //     if(blog.username == payload.username && blog.title == payload.title){
  //       blog.browse++
  //     }
  //   })
  // },
  //修改头像
  updateAvatorUrl(state,newAvatorUrl){
    //(1)修改浏览器中的token
    updateToken(newAvatorUrl)
    //(2)修改store中的token
    state.token.avatorUrl = newAvatorUrl
    //(3)修改博客中的avatorUrl
    // state.allBlog.forEach(blog => {
    //   if(blog.username == state.token.username) blog.avatorUrl = newAvatorUrl
    // })
  }
}



const store = new Vuex.Store({
  state,
  // getters,
  mutations
})

export default store