<template>
  <div id="person">
      <no-load v-if="!$store.state.isLoad"/>
      <div v-else>
        <Sum :msgList="msgList" :blogSortList="blogSortList" :collectSortList="collectSortList" :userInfo="userInfo" class="fixed-sum"/>
        <Content :content="content" class="fixed-content"/>
      </div>
  </div>
</template>

<script>

import Sum from './Sum'
import Content from './Content'
import NoLoad from 'components/noload/NoLoad'


import { getUserInfo } from 'network/user'

export default {
    data() {
        return {
            userInfo: {},
            msgList: {},
            blogSortList: {},
            collectSortList: {},
            content: {}
        }
    },
    components: {
        Sum,
        Content,
        NoLoad
    },
    mounted() {
        getUserInfo({id: this.$route.params}).then((res) => {
            // console.log(res)
            if(res.code === '0') {
                this.userInfo = res.data.userInfo
                this.msgList = res.data.msgList
                this.blogSortList = res.data.blogSortList
                this.collectSortList = res.data.collectSortList
                this.content = res.data.content
            }
        })
    }
}
</script>

<style scoped lang="less">
#person {
    /* position: relative; */
    .fixed-sum {
        position: fixed;
        top: 70px;
        left: 15%;
    }
    .fixed-content {
        position: relative;
        left: calc(35% + 15px);
    }
}
</style>