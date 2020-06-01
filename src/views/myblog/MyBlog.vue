<template>
  <div id="my_blog">
    <div class="user">
      <span>{{$store.state.token.username}}的博客</span>
    </div>
    <div class="mb_list">
      <blog-list :blogList="$store.state.myBlog" :isShow="true"/>
    </div>
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
#my_blog{
  width: 70%;
  margin-left: 15%;
  padding-top: 30px;
}
#my_blog>.user:first-child{
  color: rgba(102,154,58);
  font-size: 25px;
  margin: 20px 0;
}
.mb_list{
  min-height: 500px;
  background: white;
}
</style>