<template>
  <div id="app">
    <top-nav-bar/>
    <div class="article"></div>
  </div>
</template>

<script>

import TopNavBar from 'components/TopNavBar/TopNavBar.vue'

export default {
  name: 'App',
  components: {
    TopNavBar
  }
}
</script>

<style>
@import "assets/css/normalize.css";
.article{
  height: 1000px;
  width: 100wh;
  background-image: url("assets/img/bg.jpg");
}
</style>
