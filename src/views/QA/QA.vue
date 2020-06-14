<template>
  <div id="QA">
    <div class="top">
      <img src="~assets/img/answer.jpg">
      <div class="request" @click="addRequest"></div>
    </div>
    <div v-if="!QAList.length" class="noData">暂时还没有问答，快点击上方我要提问提出自己的问题吧~</div> 
    <!-- <div class="request_item" v-for="(item,index) in QAList" :key="index">
      <div>
        <span>{{item.date | date}}</span>
      </div>
    </div> -->
  </div>
</template>

<script>

export default {
  data(){
    return {
      QAList: []
    }
  },
  created(){
    this.QAList = this.$store.state.QAList
  },
  methods:{
    addRequest(){
      this.$router.push('/request')
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
}
.noData{
  width: 100%;
  height: 280px;
  text-align: center;
  line-height: 280px;
  font-size: 18px;
  color: rgba(102,154,58);
}
.request_item{
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}
</style>