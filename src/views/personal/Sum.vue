<template>
    <div class="sum" ref="sum" :class="!fixed ? 'fix-top' : 'fix-bottom'">
        <div class="top">
            <div class="sum-user">
                <div class="user-detail">
                    <el-avatar :size="70" :src="userInfo.avatorUrl"></el-avatar>
                    <div class="user-name">{{userInfo.nickName}}</div>
                    <div class="user-msg">{{userInfo.introduce}}</div>
                </div>
            </div>
            <div class="sum-all">
                <div v-for="(item, index) in msgList" :key="index" class="item">
                    <div>{{item.tag}}</div>
                    <div>{{item.num}}</div>
                </div>
            </div>
        </div>
        <div class="search-btn">
            <el-input placeholder="搜博主文章" prefix-icon="el-icon-search" v-model="search"></el-input>
        </div>
        <div class="blog-sort">
            <div class="title">博客分类</div>
            <div class="sort" v-for="(item, index) in blogSortList" :key="index">
                <span class="name">{{item.name}}</span>
                <span class="num">{{item.num}}篇</span>
            </div>
        </div>
        <div class="blog-sort">
            <div class="title">收藏分类</div>
            <div class="sort" v-for="(item, index) in collectSortList" :key="index">
                <span class="name">{{item.name}}</span>
                <span class="num">{{item.num}}篇</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            btnText: '+ 关注',
            search: '',
            fixed: true
        }
    },
    props: {
        userInfo: {},
        msgList: {},
        blogSortList: {},
        collectSortList: {}
    },
    mounted() {
        const bodyHeight = document.body.clientHeight
        const height = this.$refs.sum.offsetHeight
        if(height > bodyHeight) this.fixed = false
        else this.fixed = true
    }
}
</script>

<style scoped lang="less">
    .sum {
        position: fixed;
        left: 0px;
        top: 0px;
        display: inline-block;
        width: 20%;
        // min-height: calc(100vh - 80px);
        position: relative;
        // border-right: 10px solid #f4f5f6;
        margin-right: 10px;
        background:  #f4f5f6;
        & > div {
            padding: 20px;
            // border-bottom: 10px solid #f4f5f6;
            margin-bottom: 10px;
            background: #fff;
            box-sizing: border-box;
        }
        div {
            display: inline-block;
        }
        .search-btn, .top {
            width: 100%;
        }
        .blog-sort {
            padding: 20px;
            &>div {
                width: 100%;
                padding-bottom: 10px;
            }
        }
        .sort {
            color: #909399;
            font-size: 14px;
            .num {
               float: right; 
            }
        }
    }
    .sum-user {
            background: #fff;
            width: 230px;
        .user-detail {
            .user-name {
                position: absolute;
                left: 100px;
                top: 25px;
            }
            .user-msg {
                position: absolute;
                left: 100px;
                top: 65px;
                font-size: 14px;
                color: rgb(167, 163, 163);
            }
        }
    }
    .sum-all {
        .item {
            padding: 10px;
            width: 70px;
            text-align: center;
            div {
                display: block;
            }
        }
    }

</style>