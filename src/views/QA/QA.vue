<template>
  <div id="QA">
    <div class="top">
      <img src="~assets/img/answer.jpg">
      <div class="request" @click="addRequest"></div>
    </div>
    <div v-if="!$store.state.QAList.length" class="noData">暂时还没有问答，快点击上方我要提问提出自己的问题吧~</div> 
    <div v-else>
        <div class="request_item" v-for="(item,index) in $store.state.QAList" :key="index">
          <div>
            <span class="req_time">{{item.date | date}}来自 </span>
            <span class="reqer">{{item.username}}</span>
          </div>
          <div class="req_title" @click="reqDetail(item.title)">{{item.title}}</div>
          <div class="req_content">{{item.reqContent | articleText}}</div>
          <div class="req_tag" v-for="(tag,index) in item.tag" :key="index">{{tag}}</div>
          <div class="ans_num"><span>回答</span><span>{{item.answer.length}}</span></div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  methods:{
    addRequest(){
      this.$router.push('/request')
    },
    reqDetail(title){
      this.$router.push('/reqdetail/'+title)
    }
  }
}
</script>

<style>
#QA{
  width: 70%;
  margin-left: 15%;
  margin-top: 20px;
  min-height: calc(100vh - 70px);
  background-color: white;
  border-radius: 5px;
}
#QA>.top{
  height: 200px;
  overflow: hidden;
  position: relative;
}
#QA>.top>img{
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.request{
  width: 105px;
  height: 35px;
  /* background: brown; */
  position: absolute;
  bottom: 19px;
  left: 50px;
  border-radius: 5px;
  background: transparent;
  z-index: 10;
  cursor: pointer;
}
.noData{
  width: 100%;
  height: 280px;
  text-align: center;
  line-height: 280px;
  font-size: 18px;
  color: #409EFF;
}
.request_item{
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid rgb(245,246,247);
  position: relative;
}
.request_item:hover{
  background: rgba(229,229,229,.5);
}
.request_item>div{
  margin-bottom: 7px;
}
.req_time{
  font-size: 15px;
  color: rgb(152,154,170);
}
.reqer{
  font-size: 15px;
  color: rgb(73,156,214);
}
.req_title{
  font-size: 18px;
  cursor: pointer;
}
.req_content{
  width: 90%;
  color: rgb(127,127,127);
  font-size: 14px;
  margin-bottom: 10px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.req_tag{
  display: inline-block;
  background: rgb(230,230,230);
  padding: 5px;
  border-radius: 6px;
  font-size: 12px;
  color: rgb(128,100,135);
  margin-right: 10px;
}
.ans_num{
  width: 40px;
  height: 40px;
  background: rgba(102,154,58,0.7);
  color: white;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  right: 20px;
  top: 60px;
}
</style>