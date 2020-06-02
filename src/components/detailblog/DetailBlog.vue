<template>
  <div class="detail_blog">
    <div class="db_title">{{blog.title}}</div>
    <div class="db_msg">
      <div class="db_type">{{blog.type}}</div>
      <span>{{blog.username}}</span>
      <span class="db_date">{{blog.date | date}}</span>
      <i class="el-icon-chat-line-round"></i>
      <span class="number">{{blog.comment.length}}</span>
      <i class="el-icon-view"></i>
      <span class="number">{{blog.browse}}</span>
    </div>
    <div v-highlight v-html="content"></div>
  </div>
</template>

<script>

import marked from 'marked'
import { dateFormat } from 'common/util'

export default {
  name: 'DetailBlog',
  data(){
    return {
      blog: '',
      content: ''
    }
  },
  created(){
    const {username,title} = this.$route.query
    console.log({username,title})
    //来源我的博客
    if(username == undefined){
      this.$store.state.myBlog.forEach(item => {
        if(item.title === title) this.blog = item
      })
      this.content = marked(this.blog.content)
      console.log(this.content)

      console.log(this.blog.comment.length)
    }
  },
  filters: {
    date(input){
      return dateFormat(input)
    }
  }
}
</script>

<style>
.detail_blog{
  width: 70%;
  margin-left: 15%;
  margin-top: 20px;
  background: white;
  border-radius: 5px;
  padding: 10px;
  min-height: calc(100vh - 90px);
}
.db_title{
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 10px;
}
.db_msg{
  height: 30px;
  width: 100%;
  background: rgb(247,247,252);
  font-size: 14px;
  color: rgb(152,154,170);
}
.db_type{
  padding: 5px;
  display: inline-block;
  font-size: 14px;
  background: rgba(151,248,70,0.3);
  color: rgba(102,154,58);
  border-radius: 2px;
  margin: 2px 10px 0 1px;
}
.db_date{
  margin: 0 30px;
}
.number{
  margin: 0 10px 0 5px;
}
</style>