<template>
  <div id="app">
    <top-nav-bar/>
    <change-bg @changeBg="changeBg"/>
    <div class="article" :class="{day:isDay,dark:!isDay}">
      <keep-alive :exclude="noCache">
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>

import TopNavBar from 'components/topNavBar/TopNavBar.vue'
import ChangeBg  from 'components/changeBg/ChangeBg.vue'

export default {
  name: 'App',
  data(){
    return {
       isDay: true,   //日间模式
       noCache: ['DetailBlog','ModifyBlog','Search','ReqDetail']
    }
  },
  components: {
    TopNavBar,
    ChangeBg
  },
  methods: {
    //改变背景图片
    changeBg(){
      this.isDay = !this.isDay
    }
  }
}
</script>

<style>
@import "assets/css/normalize.css";
.article{
  height: calc(100vh - 50px);
  width: 100%;
  margin-top: 50px;
  overflow-y: scroll; 
}
.day{
  background-image: url("assets/img/daybg1.jpg");
}
.dark{
  background-image: url("assets/img/darkbg.jpg");
}
</style>
