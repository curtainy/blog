<template>
  <div id="my_blog">
    <div class="user">
      <span>{{$store.state.token.username}}的博客</span>
    </div>
    <div class="mb_list">
      <blog-list :blogList="blogList"/>
    </div>
  </div>
</template>

<script>

import { myBlog } from 'network/blog'
import BlogList from 'components/bloglist/BlogList'

export default {
  data(){
    return {
      blogList: []
    }
  },
  created(){
    //请求登录账户的所有博客
    const username = this.$store.state.token.username
    myBlog({username:username}).then((data) => {
      this.blogList = data.data
    })
  },
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