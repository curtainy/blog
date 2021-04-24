<template>
  <div class="collect">
      <el-collapse>
        <el-collapse-item :name="tag" v-for="(tag, index) in getTagList" :key="index" class="tag">
            <template slot="title">
                <img src="~assets/img/folder.png"/>
                <span>{{tag}}</span>
            </template>
            <div v-for="(item, index) in collect[tag]" :key="index" class="detail">
                <div class="left">
                    <div class="title">{{item.title}}</div>
                    <div class="other">
                        <span>{{item.nickName}}</span>
                        <span>{{item.createTime}}</span>
                    </div>
                </div>
                <!-- 只有查看自己的主页时，才显示取消收藏的按钮 -->
                <div class="right" v-if="$route.params.id == $store.state.token.id">
                    <el-button round @click="handleCollect(index,item.blogId)">取消收藏</el-button>
                </div>
            </div>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>

import { collectBlog } from 'network/blog'

export default {
    props: {
        collect: {}
    },
    computed: {
        getTagList() {
            return this.collect ? Object.keys(this.collect) : []
        }
    },
    methods: {
        handleCollect(blogId) {
            collectBlog({
                id: this.$store.state.token.id,
                blogId,
                collectFlag: true
            }).then((res) => {
                if(res.code === '0') {
                    // this.collect[tagName].splice(index,1)
                    this.$message.success(res.data.msg)
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.collect {
    width: 100%;
    .tag {
        img {
            margin-left: 10px;
        }
        & > span {
            margin-left: 10px;
        }
    }
    .detail {
        border-top: 1px solid #dfe1e4;
        padding: 10px 30px;
        &:hover {
            background: #fafafc;
            .title {
                color: #409EFF;
            }
        }
        .title {
            font-size: 18px;
            font-weight: bolder;
        }
        .other {
            font-size: 14px;
            color: rgb(165, 162, 162);
            & > span:first-child{
                margin-right: 20px;
            }
        }
        .left, .right {
            display: inline-block;
        }
        .right {
            float: right;
            margin-top: 10px;
        }
    }
}
/deep/ .el-collapse-item__header {
    height: 70px !important;
    font-size: 18px;
}
/deep/ .el-collapse-item__content {
    padding-bottom: 0;
}
</style>