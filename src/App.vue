<template>
  <div id="app">
    <template v-if="getShow">
      <top-nav-bar/>
    <change-bg @changeBg="changeBg"/>
    <div class="article" :class="{day:isDay,dark:!isDay}">
      <!-- <keep-alive :exclude="noCache"> -->
        <router-view/>
      <!-- </keep-alive> -->
      
    </div>
    </template>
    <template v-else>
      <router-view/>
    </template>
  </div>
</template>

<script>

import TopNavBar from 'components/TopNavBar/TopNavBar.vue'
import ChangeBg  from 'components/changeBg/ChangeBg.vue'

export default {
  name: 'App',
  data(){
    return {
       isDay: true,   //日间模式
       noCache: ['DetailBlog','ModifyBlog','Search','ReqDetail','Creation']
    }
  },
  components: {
    TopNavBar,
    ChangeBg
  },
  computed: {
    getShow() {
      return this.$route.path != '/login' && this.$route.path != '/register' && this.$route.path != '/findpassword'
    }
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
#app {
  min-width: 100%;
}
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
.position {
  margin-top: 0;
}
</style>
