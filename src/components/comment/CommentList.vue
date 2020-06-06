<template>
  <div v-if="commentList.length">
    <div v-for="(comment,index1) in commentList" 
           :key="index1" class="comment_item">
        <img :src="comment.headImg">
        <span>{{comment.username}}: </span>
        <span>{{comment.content}}</span>
        <span>{{comment.date | date}}</span>
        <span @click="resComment(index1,comment.username)" class="res">回复</span>
        <div v-for="(response,index2) in comment.response" 
             :key="index2" class="response_item">
          <img :src="response.headImg">
          <span>{{response.username}}: </span>
          <span>{{response.content}}</span>
          <span>{{response.date | date}}</span>
          <span @click="resComment(index1,response.username)" class="res">回复</span>
        </div>
    </div>
  </div>
</template>

<script>

import { dateFormat } from 'common/util'

export default {
  props:{
    commentList: {
      type: Array,
      default(){
        return []
      }
    }
  },
  filters: {
    date(input){
      return dateFormat(input)
    }
  },
  methods: {
    //回复评论
    resComment(index,username){
      const cnthead = '@'+ username + ' '
      console.log(index,cnthead)
      //给父组件传递要回复的评论所在索引和被回复人的昵称
      this.$emit('resComment',index,cnthead)
    },
  }
}
</script>

<style>
.comment_item{
  padding: 10px 0;
  border-bottom: 1px solid gainsboro;
}
.response_item{
  padding: 10px 0;
  padding-left: 30px;
}
.comment_item span{
  position: relative;
  top: -5px;
  font-size: 13px;
}
.comment_item img{
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 5px;
}
.comment_item span:nth-child(4){
  margin-left: 20px;
  color: rgb(152,154,170);
}
.res{
  margin-left: 10px;
  color: rgba(102,154,58);
}
</style>