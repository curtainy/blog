<template>
  <div id="all_blog">
    <div class="category">
      <div v-for="(item, index) in categoryList" 
          :key="index" 
          :class="{'checked': activeIndex === index}"
          @click="checked(index)">{{item}}</div>
    </div>
    <blog-list class="blog-list" :blogList="blogList"/>
  </div>
</template>

<script>

import { allBlog } from 'network/blog.js'
import BlogList from 'components/bloglist/BlogList'


export default {
  data() {
    return {
      activeIndex: 0,
      blogList: [],
      categoryList: ['热门','关注','前端','后端','Android','IOS','人工智能','开发工具','其他']
    }
  },
  components: {
    BlogList
  },
  mounted() {
    this.getBlogList()
  },
  methods: {
    getBlogList() {
      const data = {
        tag: this.categoryList[this.activeIndex]
      }
      allBlog(data).then((res) => {
        if(res.code === '0') {
          this.blogList = res.data.blog
        }
      })
    },
    checked(index) {
      this.activeIndex = index
      this.getBlogList()
    }
  }
}
</script>

<style scoped>
#all_blog{
  width: 70%;
  margin-top: 20px;
  margin-left: 15%;
  border-radius: 5px;
}
.category {
  border: 1px solid rgb(240, 239, 239);
  background: #fff;
  border-radius: 3px;
  position: fixed;
  top: 69px;
  /* left: 250px; */
  left: 18%;
}
.checked {
  background: #8cc1f7;
  color: #fff !important;
}
.category > div {
  width: 100px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: rgb(167, 169, 180);
  cursor: pointer;
}
.category > div:not(:last-child) {
  border-bottom: 1px solid rgb(240, 239, 239);
}
.blog-list {
  display: inline-block;
  min-height: calc(100vh - 92px);
  margin-left: 170px;;
  background: #fff;
  width: 80%;
}
</style>