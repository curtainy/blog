<template>
  <div id="all_blog">
    <blog-list :blogList="$store.state.allBlog"/>
  </div>
</template>

<script>

import BlogList from 'components/bloglist/BlogList'

export default {
  components: {
    BlogList
  }
}
</script>

<style>
#all_blog{
  width: 70%;
  min-height: calc(100vh - 80px);
  background: white;
  margin-top: 20px;
  margin-left: 15%;
  border-radius: 3px;
}
</style>