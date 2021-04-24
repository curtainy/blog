<template>
  <div id="chat">
     <div class="category">
      <div v-for="(item, index) in topicList" 
          :key="index" 
          :class="{'checked': activeIndex === index}"
          @click="checked(index)">{{item}}</div>
    </div>
    <div class="detail"> 
      <PublishChat :topicList="topicList"/>
      <div v-for="(topicContent, index) in topicContentList" :key="index">
        <ChatDetail :chat="topicContent"/>
      </div>
    </div>
    
  </div>
</template>

<script>

import { topicContentList } from 'network/topic.js'

import PublishChat from './PublishChat'
import ChatDetail from './ChatDeatil'

export default {
    data() {
        return {
            activeIndex: 0,
            topicList: ['热门','我的','前端','后端','Android','IOS','人工智能','开发工具','其他'],
            topicContentList: []
        }
    },
    components: {
        PublishChat,
        ChatDetail
    },
    created() {
      this.getTopicContentList()
    },
    methods: {
        checked(index) {
            this.activeIndex = index
            this.getTopicContentList()
        },
        getTopicContentList() {
          let data = {topic: this.topicList[this.activeIndex]}
          if(this.activeIndex === 1) data.id = this.$store.state.token.id
          topicContentList(data).then(res => {
            if(res.code == '0') {
              this.topicContentList = res.data.topicContentList
            }
          })
        }
    }
}
</script>

<style scoped>
#chat {
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
.detail {
  min-height: calc(100vh - 92px);
  margin-left: 170px;;
  width: 80%;
}
</style>