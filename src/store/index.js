import Vue from 'vue'
import Vuex from 'vuex'

import { getToken,updateToken } from 'network/storage'
import { noPubBlog ,allBlog } from 'network/blog'
import { getAllQA } from 'network/QA'



Vue.use(Vuex)

const state = {
  token: {},
  isLoad: false,
  allBlog: [],
  noPubBlog: [],
  QAList: []
}

//获取所有博客
allBlog().then(res => {
  state.allBlog = res.data.blogList
  state.allBlog.forEach(blog => {
    blog.headImg = blog.headImg.replace(/\s/g,'+')
    blog.comment.forEach(comment => {
      comment.headImg = comment.headImg.replace(/\s/g,'+')
    })
  })
})
//获取所有问答
getAllQA().then(data =>{
  state.QAList = data.data
  
  state.QAList.forEach(qa => {
    qa.answer.forEach(answer => {
      answer.headImg = answer.headImg.replace(/\s/g,'+')
    })
  })
})

//用户登录状态
if(getToken().username != undefined){
  state.token = getToken()
  state.isLoad = true
  noPubBlog({username:state.token.username}).then((data) => {
    state.noPubBlog = data.data
  })
}

const getters = {
  //当前用户已发布的博客
  getMyBlog(state){
    const myBlog = state.allBlog.filter(blog => {
      return blog.username === state.token.username
    })
    return myBlog
  },
  //当前用户的所有博客
  getMyAllBlog(state,getters){
    return state.noPubBlog.concat(getters.getMyBlog)
  }
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
  //添加博客
  addBlog(state,blog){
    state.allBlog.push(blog)
  },
  //添加草稿箱
  addNoPublish(state,blog){
    state.noPubBlog.push(blog)
  },
  //删除博客
  cancelBlog(state,title){
    console.log(getters.getMyBlog)
    console.log(state.getMyBlog)
    var arr = getters.getMyBlog.concat(state.noPubBlog)
    for(let i = 0; i < arr.length; i++){
      if(arr[i].title === title){
        state.allBlog.splice(i,1)
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
  },
  //保存转发布
  saveToPub(state,title){
    //从草稿箱中删除
    var blog
    for(let i = 0; i < state.noPubBlog.length; i++){
      if(state.noPubBlog[i].title === title && state.noPubBlog[i].username === state.token.username){
        blog = state.noPubBlog.splice(i,1)[0]
        break;
      }
    } 
    blog.publish = true
    //添加到已发布博客数组中
    this.commit('addBlog',blog)
  },
  //提交评论
  publishComment(state,payload){
    console.log(payload)
    state.allBlog.forEach(blog => {
      if(blog.username === payload.username && blog.title === payload.title){
        blog.comment.push(payload.comment)
      }
    })
  },
  //回复评论
  responseComment(state,payload){
    state.allBlog.forEach(blog => {
      if(blog.username === payload.username && blog.title === payload.title){
        blog.comment[payload.index].response.push(payload.comment)
      }
    })
  },
  //增加博客访问量
  addBrowse(state,payload){
    state.allBlog.forEach(blog => {
      if(blog.username == payload.username && blog.title == payload.title){
        blog.browse++
      }
    })
  },
  //修改头像
  updateHeadImg(state,newHeadImg){
    //(1)修改浏览器中的token
    updateToken(newHeadImg)
    //(2)修改store中的token
    state.token.headImg = newHeadImg
    //(3)修改博客中的headImg
    state.allBlog.forEach(blog => {
      if(blog.username == state.token.username) blog.headImg = newHeadImg
    })
  },
  //提交问题
  addRequest(state,data){
    this.state.QAList.push(data)
  },
  //提交答案
  addAnswer(state,payload){
    for(let i = 0; i < state.QAList.length; i++){
      if(state.QAList[i].username == payload.username && this.state.QAList[i].title == payload.title){
        state.QAList[i].answer.push(payload.answer)
      }
    }
  }
}



const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store