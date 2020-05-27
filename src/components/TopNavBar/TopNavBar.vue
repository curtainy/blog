<template>
  <div id="top-nav-bar">
    <div class="icon">
        <img src="~assets/img/blog_icon.jpg">
        <div>blog</div>
    </div>
    <nav-item :navList="navList" class="items"/>
    <div class="demo-input-suffix search">
            <el-input placeholder="请输入内容"  v-model="input" class="input">
              <i slot="prefix" class="el-input__icon el-icon-search search-icon"></i>
            </el-input>
    </div>
    <div class="admin">
      <i class="el-icon-s-custom"></i>
      <span class="login">登录/</span>
      <span>注册</span>
    </div>
  </div>
</template>

<script>

import NavItem from './NavItem'

export default {
  data(){
    return {
      input: '',
      navList: ['博客','问答','创作','VIP会员']
    }
  },
  components: {
    NavItem
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
  background-color: rgb(246,246,246);
}
#top-nav-bar>div{
  float: left;
  height: 100%;
}
.icon{
  width: 300px;
}
.icon>img{
  margin:0 20px 0 60px;
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

</style>