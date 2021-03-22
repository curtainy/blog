<template>
  <div class="fans">
      <div class="tab">
            <span v-for="(item, index) in tabList" :key="index" 
                :class="{'active': activeIndex === index}" 
                @click="activeIndex=index"
            >{{item}}</span>
      </div>
      <div class="fans-detail">
          <div v-for="(user,index) in getContent" :key="index" class="detail">
              <el-avatar :size="60" :src="user.avatorUrl"></el-avatar>
              <div class="user-name">{{user.nickName}}</div>
              <div class="user-msg">{{user.introduce}}</div>
              <el-button round class="btn" @click="cancelConcern(user.userId,user)" v-if="user.concern">取关</el-button>
              <el-button round class="btn" @click="handleConcern(user.userId,user)" v-else>关注</el-button>
          </div>
      </div>
  </div>
</template>

<script>

import { toConcern, cancelConcern } from 'network/fans'

export default {
    data() {
        return {
            tabList: ['TA关注的人','TA的粉丝'],
            activeIndex: 0,
        }
    },
    props: {
        concern: {},
        fans: {}
    },
    computed: {
        getContent() {
            if(this.activeIndex === 0) return this.concern
            else return this.fans
        }
    },
    methods: {
        async handleConcern(userId,user) {
            const data = {
                user: this.$store.state.userId,
                friend: userId
            }
            await toConcern(data).then((res) => {
                if(res.code === '0') {
                    this.$message.success('关注成功')
                    user.concern = true
                } 
            })
        },
        async cancelConcern(userId,user) {
            const data = {
                user: this.$store.state.userId,
                friend: userId
            }
            await cancelConcern(data).then((res) => {
            if(res.code === '0') {
                    this.$message.success('已取消关注')
                    user.concern = false
                } 
            })
        }
    }
}
</script>

<style scoped lang="less">
 .fans {
     width: 100%;
    .tab {
        padding: 10px;
        border-bottom: 1px solid #dfe1e4;
        border-top: 1px solid #dfe1e4;
        span {
            font-size: 14px;
            margin-right: 30px;
            color: #6b6c6d;
        }   
        .active {
            color: #409EFF;
        }
    }
    .fans-detail {
        .detail {
            padding: 10px 20px;
            position: relative;
            border-bottom: 1px solid #dfe1e4;
            & > div {
                display: inline-block;
            }
            &:hover {
                background: #fafafc;
            }
        }
        .user-name {
            position: absolute;
            left: 90px;
            top: 20px;
        }
        .user-msg {
            position: absolute;
            left: 90px;
            top: 50px;
            font-size: 14px;
            color: rgb(167, 163, 163);
        }
        .btn {
            float: right;
            position: relative;
            top: 10px;
        }
    }
}
</style>