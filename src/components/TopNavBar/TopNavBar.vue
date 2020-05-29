<template>
  <div id="top-nav-bar">
    <div class="icon">
        <img src="~assets/img/blog_icon.jpg">
        <div>BLOG</div>
    </div>
    <nav-item :navList="navList" class="items"/>
    <div class="demo-input-suffix search">
            <el-input placeholder="请输入内容"  v-model="input" class="input">
              <i slot="prefix" class="el-input__icon el-icon-search search-icon"></i>
            </el-input>
    </div>
    <div class="admin" v-if="!isLoad">
      <i class="el-icon-s-custom"></i>
      <span class="login" @click="loginBtn">登录/</span>
      <span @click="registerBtn">注册</span>
    </div>
    <div class="load" v-if="isLoad">
      <img :src="userId.headImg">
      <div class="user">{{userId.username}}</div>
      <div @click="handleQuit">退出</div>
    </div>
  </div>
</template>

<script>

import NavItem from './NavItem'

import { getToken, removeToken } from 'common/storage'

export default {
  data(){
    return {
      input: '',
      navList: ['博客','问答','创作','VIP会员'],
      isLoad: false,  //是否登陆
      userId: {},
    }
  },
  components: {
    NavItem
  },
  mounted(){
    //当前是否为登录状态
    const token = getToken()
    console.log(token)
    if(token.username !== undefined){//当前已登录
      this.isLoad = true
      this.userId = token
    }
  },
  methods: {
    loginBtn(){
      this.$router.push('/login')
    },
    registerBtn(){
      this.$router.push('/register')
    },
    handleQuit(){
      removeToken()
      this.isLoad = false
    }
  }
}
</script>

<style>
#top-nav-bar{
  height: 50px;
  width: 100%;
  
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(52,64,70);

  color: gainsboro;
}
#top-nav-bar>div:not(.change-bg){
  float: left;
  height: 100%;
}
.icon{
  width: 300px;
}
.icon>img{
  margin:0 10px 0 40px;
  height: 100%;
}
.icon>div{
  display: inline-block;
  height: 100%;
  line-height: 50px; 
  position: relative; 
  top: -40%;
}

.search{
  width: 300px;
  margin: 0 50px;
}
.input{
  margin-top: 5px;
}
.admin{
  padding-top: 15px;
  margin-left: 100px;
}
.login{
  margin-left: 5px;
}
.load img{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 5px 15px 5px 60px;
}
.load div{
  height: 100%;
  line-height: 100%;
  display: inline-block;
  position: relative;
  top: -20px;
}
.user{
  margin-right: 10px;
}
</style>