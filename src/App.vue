<template>
  <div id="app">
    <top-nav-bar/>
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
body{
  background-color: rgb(240,243,244);
}
</style>
