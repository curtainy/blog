<template>
  <div id="my_blog">
    <div class="user">
      <span>{{$store.state.token.username}}的博客</span>
      <input type="radio" value="1" v-model="type"><label>已发布</label>
      <input type="radio" value="2" v-model="type"><label>草稿箱</label>
    </div>
    <div class="mb_list">
      <blog-list :blogList="blogList" :isShow="true"/>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import BlogList from 'components/bloglist/BlogList'

export default {
  data(){
    return {
      type: '1',
      blogList: []
    }
  },
  components: {
    BlogList
  },
  computed: {
    ...mapGetters(['getMyBlog']),
  },
  created(){
    this.blogList = this.getMyBlog
  },
  watch: {
    type(){
      if(this.type == '1') this.blogList = this.getMyBlog
      else this.blogList = this.$store.state.noPubBlog
      console.log(this.blogList)
    }
  }
}
</script>

<style>
#my_blog{
  width: 70%;
  margin-left: 15%;
  padding-top: 30px;
}
#my_blog>.user>span{
  color: rgba(102,154,58);
  font-size: 25px;
  margin: 0 80px 20px 0;
}
#my_blog>.user>input{
  margin-left: 20px;
}
#my_blog>.user>label{
  color: gray;
  font-size: 14px;
  margin-left: 5px;
}
.mb_list{
  min-height: 500px;
  background: white;
}
</style>