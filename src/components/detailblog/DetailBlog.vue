<template>
  <div class="detail_blog">
    <div class="db_title">{{blog.title}}</div>
    <div class="db_msg">
      <div class="db_type">{{blog.type}}</div>
      <span>{{blog.username}}</span>
      <span class="db_date">{{blog.date | date}}</span>
      <i class="el-icon-chat-line-round"></i>
      <span class="number">{{getLength(blog.comment)}}</span>
      <i class="el-icon-view"></i>
      <span class="number">{{blog.browse}}</span>
    </div>
    <div v-highlight v-html="content"></div>
    <div class="db_comment">
      <img v-if="this.$store.state.isLoad" :src="blog.headImg">
      <img v-else src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=145692761,4091651670&fm=26&gp=0.jpg">
      <textarea rows="2" ref="cnt" autofocus v-model="commentConent" placeholder="优质评论可以帮助作者获得更高的权重"></textarea>
      <div @click="sendComment(blog.title)">发表评论</div>
    </div>
    <comment-list :commentList="blog.comment" @resComment="resComment"/>
  </div>
</template>

<script>

import marked from 'marked'
import CommentList from 'components/comment/CommentList'
import {mapGetters} from 'vuex'
// import { publishComment, addBrowse } from 'network/blog'

export default {
  name: 'DetailBlog',
  data(){
    return {
      blog: '',
      content: '',
      commentConent: '',
      type: true,   //true发表或false评论
      resIndex: ''//被回复评论的索引
    }
  },
  components:{
    CommentList
  },
  computed: {
    ...mapGetters(['getMyBlog']),
    getLength(){
      return function(arr){
        let count = arr.length
        arr.forEach(item => {
          count += item.response.length
        })
        return count
      }
    }
  },
  created(){
    const {username,title} = this.$route.query
    var blog = ''
    //获取博客内容
    if(username == this.$store.state.token.username) blog = this.getMyBlog
    else blog = this.$store.state.allBlog
    blog.forEach(item => {
      if(item.title === title && item.username == username) this.blog = item
    })
    this.content = marked(this.blog.content)
    //博客访问量+1
    // addBrowse({username,title}).then(data => {
    //   if(data.code == 0){
        this.$store.commit('addBrowse',{username,title})
    //  }
   // })
  },
  methods: {
    //发表评论
    sendComment(title){
      if(this.commentConent == ''){//评论内容为空
        this.$message.error('评论内容不能为空')
      }else if(!this.$store.state.isLoad){//还未登录
        this.$message.error('登录后才能进行评论哦')
      }else{ 
        const comment = {
          username: this.$store.state.token.username,
          headImg: this.$store.state.token.headImg,
          content: this.commentConent,
          date: new Date().getTime(),
          response: []
        }

        if(this.type){ //发表评论
          const payload = {username:this.blog.username,title:title,comment}
          // publishComment(payload)
          // .then((data) => {
          //   if(data.code === 0){
               //清空评论中内容
              this.commentConent = ''
              //弹窗
             // this.$message({type: 'success', message: data.msg})
              //修改store中的allBlog
              this.$store.commit('publishComment',payload)
          //   }
          // })
        }else{ //回复评论
          delete comment.response
          const payload = {username:this.blog.username,title,index:this.resIndex,comment}
          // publishComment(payload).then(data => {
          //   if(data.code === 0){
          //     this.$message({type: 'success',message: data.msg})
              //修改store
              this.$store.commit('responseComment',payload)
              this.commentConent = ''
              this.type = true
          //   }
          // })
        }
      }
    },
    //回复评论
    resComment(index,cnthead){
      this.commentConent = cnthead
      this.resIndex = index
      this.type = false
    }
  }
}
</script>

<style scoped>
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
  background: #a3ccf5;
  /* color: #409EFF; */
  color: #fff;
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
  background: #409EFF;
  color: white;
  position: relative;
  top: -10px;
  margin-left: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>