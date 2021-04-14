<template>
  <div id="content">
        <div class="top">
          <div v-for="(item, index) in type" :key="index" 
            :class="{'active': activeIndex === index}" 
            @click="changeIndex(index)">
            {{item}}
          </div>
        </div>
        <Blog :blog="content.blog" v-show="activeIndex === 0"/>
        <Collect :collect="content.collect" v-show="activeIndex === 1"/>
        <Concern :concern="content.concern" v-show="activeIndex === 2"/>
  </div>
</template>

<script>

import Concern from './Concern'
import Blog from './Blog'
import Collect from './Collect' 

export default {
    data() {
        return {
            type: ['博客','收藏','关注'],
            activeIndex: 0
        }
    },
    props: {
        content: {
            blog: {},
            collect: {},
            concern: {}
        }
    },
    components: {
        Concern,
        Collect,
        Blog
    },
    methods: {
        changeIndex(index) {
            this.activeIndex = index
        }
    }
}
</script>

<style scoped lang="less">
#content {
    vertical-align: top;
    width: 50%;
    display: inline-block;
    position: relative;
    min-height: calc(100vh - 80px);
    background: #fff;
    margin-top: 20px;
    & div {
        display: inline-block;
    }
    .top {
            width: 100%;
        div {
            padding: 20px 30px;
            font-size: 18px;
        }
        .active {
            color: #409EFF;
        }
    }
}
</style>