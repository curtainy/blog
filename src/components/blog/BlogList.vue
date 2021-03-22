<template>
  <div class="blog-list">
     <div v-for="(item,index) in blogList" :key="index" class="detail">
                <div class="title" @click="toBlogDetail(item)">
                  {{item.title}}
                  <!-- 博客仅自己可见 -->
                  <!-- <i class="el-icon-lock"></i> -->
                </div>
                <div class="blog-content">{{item.content}}</div>
                <div class="other">
                    <span>{{item.createTime}}</span>
                    <div class="btn" v-show="item.userId != $store.state.token._id">
                        <span>编辑</span>
                        <span @click="cancelBlog(index,item.title)">删除</span>
                    </div>
                </div>
      </div>
  </div>
</template>

<script>

import { cancelBlog } from 'network/blog'

export default {
  props: {
    tagName: {},
    blogList: {},
    activeBlog: {}
  },
  methods: {
    async cancelBlog(index,title) {
      const data = {
        userId: this.$store.state.user.userId,
        tagName: this.tagName,
        title
      }
      this.blogList.splice(index,1)
      await cancelBlog(data).then((res) => {
        if(res.code === '0') {
          this.$message.success('删除成功')
        }
      })
    },
    toBlogDetail(blog) {
      // this.activeBlog = blog
      this.$bus.$emit('blogDetail', blog)
      this.$router.push('/blogdetail/' + blog.userId + '/' + blog.title)
    }
  }
}
</script>

<style scoped lang="less">
.blog-list {
  .detail {
        border-top: 1px solid #dfe1e4;
        padding: 10px 30px;
        position: relative;
        &:hover {
            background: #fafafc;
            .title {
                color: #409EFF;
                cursor: pointer;
            }
        }
        .title {
            font-size: 18px;
            font-weight: bolder;
        }
        .blog-content {
            font-size: 14px;
            color: rgb(165, 162, 162);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &  div {
            display: inline-block;
        }
        .other {
            .btn > span:first-child{
                margin-right: 20px;
            }
            .btn {
                position: absolute;
                right: 30px;
                & > span:first-child:hover {
                    color: #409EFF;
                }
                & > span:last-child:hover {
                    color: red;
                }
            }
        }
  }
}
</style>