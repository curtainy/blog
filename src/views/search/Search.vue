<template>
  <div id="search">
    <blog-list :blogList="blogList"/>
  </div>
</template>

<script>

import BlogList from 'components/bloglist/BlogList'

export default {
   data(){
    return {
      blogList: [],
      input: ''
    }
  },
  mounted(){
    this.input = this.$route.params.input
    this.getSearch(this.input)
  },
  beforeRouteUpdate(to,from,next){
    console.log(to)
    this.getSearch(to.params.input)
    next()
  },
  components: {
    BlogList
  },
  methods: {
    getSearch(input){
        var reg = new RegExp(input,'gim')
        this.blogList = this.$store.state.allBlog.filter(blog => {
            return reg.test(blog.content)
        })
    }
  }
}
</script>

<style>
#search{
  width: 70%;
  min-height: calc(100vh - 80px);
  background: white;
  margin-top: 20px;
  margin-left: 15%;
  border-radius: 3px;
}
</style>