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
    <div class="db_comment">
      <img v-if="this.$store.state.isLoad" :src="blog.headImg">
      <textarea rows="2" v-model="commentConent" placeholder="优质评论可以帮助作者获得更高的权重"></textarea>
      <div @click="sendComment">发送</div>
    </div>
  </div>
</template>

<script>

import marked from 'marked'
import { dateFormat } from 'common/util'
import { mapGetters } from 'vuex'

export default {
  name: 'DetailBlog',
  data(){
    return {
      blog: '',
      content: '',
      commentConent: ''
    }
  },
  computed: {
    ...mapGetters(['getMyBlog'])
  },
  created(){
    const {username,title} = this.$route.query
    console.log({username,title})
    //来源我的博客
    // if(username == this.$store.state.token.username){
      this.getMyBlog.forEach(item => {
        if(item.title === title) this.blog = item
      })
      this.content = marked(this.blog.content)
      // console.log(this.blog)

      // console.log(this.blog.comment.length)
    // }
  },
  filters: {
    date(input){
      return dateFormat(input)
    }
  },
  methods: {
    sendComment(){
      if(this.commentConent == ''){//评论内容为空
        this.$message.error('评论内容不能为空')
      }else if(!this.$store.state.isLoad){//还未登录
        this.$message.error('登录后才能进行评论哦')
      }else{
        const comment = {
          username: this.$store.state.token.username,
          headImg: this.$store.state.token.headImg,
          content: this.commentConent,
          date: new Date().getTime()
        }
        console.log(comment)
      }
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
  margin: 0 50px;
}
.number{
  margin: 0 15px 0 5px;
}
.db_comment>img{
  margin-top: 50px;
  margin-right: 20px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.db_comment>textarea{
  width: 82%;
}
textarea::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
    color: gainsboro;
    font-size: 14px;
}
.db_comment>div{
  display: inline-block;
  width: 80px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background: rgba(102,154,58);
  color: white;
  position: relative;
  top: -10px;
  margin-left: 20px;
  border-radius: 5px;
}
</style>