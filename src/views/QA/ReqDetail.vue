<template>
  <div id="req_detail">
    <h2 class="rd_title">{{request.title}}</h2>
    <div v-highlight v-html="reqContent"></div>
    <div class="rd_time">编辑于： {{request.date | date}}</div>
    <div class="rd_tag" v-for="(tag,index) in request.tag" :key="index">{{tag}}</div>
    <div class="rd_answer">
      <div class="answer_num">{{request.answer.length}}个回答</div>
      <div v-for="(item,index) in request.answer" :key="index" class="answer_item">
        <img :src="item.headImg">
        <span>{{item.username}}</span>
        <div class="content">{{item.answerContent}}</div>
        <div class="time">发布于： {{item.date | date}}</div>
      </div>
    </div>
    <mavon-editor  ref="editor" v-model="answerContent" class="comment"/>
    <div class="comment_text">严禁抄袭、复制等行为，是时候展现真正的技术了！</div>
    <div class="answer" @click="answer">我要回答</div>
  </div>
</template>

<script>

import marked from 'marked'
import { mavonEditor } from 'mavon-editor'
import { addAnswer } from 'network/QA'
import "mavon-editor/dist/css/index.css"

export default {
  name: 'ReqDetail',
  data(){
    return {
      request: {},
      reqContent: '',
      answerContent: ''
    }
  },
  created(){
    const title = this.$route.params.title
    const QAList = this.$store.state.QAList
    for(let i = 0; i < QAList.length; i++){
      if(QAList[i].title === title){
        this.request = QAList[i]
        this.reqContent = marked(this.request.reqContent)
        break;
      }
    }
  },
  components: {
    mavonEditor
  },
  methods: {
    answer(){
      if(!this.$store.state.isLoad){
        this.$message({type: 'error',message: '登录后才能回答问题哦'})
      }else{
        const answer = {
          username: this.$store.state.token.username,
          headImg: this.$store.state.token.headImg,
          date: new Date().getTime(),
          answerContent: this.answerContent
        }
        const answerData = {
          username:this.request.username,
          title:this.request.title,
          answer
        }
        addAnswer(answerData).then(data => {
          if(data.code === 0){
            this.$store.commit('addAnswer',answerData)
            this.answerContent = ''
            this.$message({type: 'success', message: data.msg})
          }
        })
      }
      
    }
  }
}
</script>

<style>
#req_detail{
  width: 70%;
  margin-left: 15%;
  margin-top: 10px;
  min-height: calc(100vh - 70px);
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 5px;
  overflow: hidden;
}
.rd_time{
  border-top: 1px solid rgb(230,230,230);
  margin-top: 50px;
  padding: 20px 0;
  color: gray;
  font-size: 13px;
}
.rd_tag{
  display: inline-block;
  background: rgb(230,230,230);
  padding: 5px;
  border-radius: 6px;
  font-size: 12px;
  color: rgb(128,100,135);
  margin-right: 10px;
}
.answer_num{
  margin-top: 30px;
  padding: 10px 0;
  border-top: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
}
.answer_item{
  border-bottom: 1px solid rgb(230,230,230);
  padding: 10px 0;
}
.answer_item>img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.answer_item>span{
  color: rgb(73,156,214);
  font-size: 15px;
  margin-left: 10px;
  position: relative;
  top: -8px;
}
.answer_item>.content{
  padding: 10px 0;
  font-size: 14px;
  color: rgb(128,100,135);
}
.answer_item>.time{
  color: gray;
  font-size: 12px;
  margin-top: 10px;
}
#req_detail>.comment{
  margin-top: 30px;
}
.comment_text{
  margin-top: 10px;
  color: red;
  font-size: 12px;
}
.answer{
  height: 30px;
  width: 8%;
  border-radius: 5px;
  background: rgba(102,154,58);
  color: white;
  text-align: center;
  line-height: 30px;
  margin: 20px 0;
  float:right;
}
</style>