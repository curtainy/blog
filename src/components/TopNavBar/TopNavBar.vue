<template>
  <div id="top-nav-bar">
    <div class="icon">
        <img src="~assets/img/blog_icon.jpg">
        <div>BLOG</div>
    </div>
    <nav-item :navList="navList" class="items"/>
    <div class="demo-input-suffix search" @keyup="search">
            <el-input placeholder="请输入内容"  v-model="input" class="input">
              <i slot="prefix" class="el-input__icon el-icon-search search-icon"></i>
            </el-input>
    </div>
    <div class="admin right" v-if="!$store.state.isLoad">
      <i class="el-icon-s-custom"></i>
      <span class="login" @click="loginBtn">登录/</span>
      <span @click="registerBtn">注册</span>
    </div>
    <div class="load right" v-else>
      <img :src="$store.state.token.avatorUrl" @click="handleClick">
      <div class="user">{{$store.state.token.username}}</div>
      <el-badge :value="200" :max="99" class="msg"><span>消息</span></el-badge>
      <div class="quit" @click="quit">退出登录</div>
    </div>
  </div>
</template>

<script>

import NavItem from './NavItem'
import { removeToken } from 'network/storage'

export default {
  data(){
    return {
      input: '',
      navList: ['博客','创作','闲聊','个人中心'],
      currentIndex: 0,
    }
  },
  components: {
    NavItem
  },
  methods: {
    loginBtn(){
      this.$router.push('/login')
    },
    registerBtn(){
      this.$router.push('/register')
    },
    quit(){
      var bool = window.confirm('确认退出？')
      if(bool){
        removeToken() 
        this.$store.commit('quit')
      }
    },
    search(e){
      if(e.keyCode === 13){//enter键按下
        this.$router.push('/search/'+this.input)
        this.input = ''
      }
    },
    handleClick() {
      this.$router.push('/profile')
    }
  }
}
</script>
<style scoped>
#top-nav-bar{
  height: 50px;
  min-width: 1600px;
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
  width: 15%;
  /* border: 1px solid #fff; */
}
.icon>img{
  height: 100%;
  margin-left: 20px;
}
.icon>div{
  display: inline-block;
  height: 100%;
  line-height: 50px; 
  position: relative; 
  top: -40%;
}
.right {
  /* position: fixed;
  right: 30px;
  top: 0; */
  float: right;
}
.search{
  width: 300px;
  margin: 0 30px;
}
.search>.input{
  margin-top: 5px;
}
.admin{
  padding-top: 15px;
  margin-left: 100px;
}
.admin > span {
  cursor: pointer;
}
.login{
  margin-left: 5px;
}
.load img{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 5px 15px 5px 30px;
}

.user{
  height: 100%;
  line-height: 100%;
  display: inline-block;
  position: relative;
  top: -20px;
  margin-right: 20px;
}
.quit{
  display: inline-block;
  padding: 5px;
  background: #a1bdda;
  border-radius: 5px;
  position: relative;
  top: -20px;
  margin-right: 10px;
  cursor: pointer;
}
.msg {
  margin-top: 10px;
  margin-right: 40px;
  position: relative;
  top: -27px;
  cursor: pointer;
}
.msg > span {
  /* font-size: 18px; */
  font-size: 17px;
  color: gainsboro;
  padding: 5px;
}
</style>