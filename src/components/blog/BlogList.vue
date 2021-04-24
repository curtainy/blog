<template>
  <div class="blog-list">
     <div v-for="(blog,index) in blogList" :key="index" class="detail">
                <div class="title" @click="toBlogDetail(blog.blogId)">
                  {{blog.title}}
                  <!-- 博客仅自己可见 -->
                  <!-- <i class="el-icon-lock"></i> -->
                </div>
                <div class="blog-content">{{blog.content}}</div>
                <div class="other">
                    <span>{{blog.date}}</span>
                    <div class="btn" v-show="$route.params.id == $store.state.token._id">
                        <span @click="edit(blog.blogId)">编辑</span>
                        <span @click="cancel(index,blog.blogId)">删除</span>
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
    // activeBlog: {}
  },
  methods: {
    // 编辑博客
    edit(blogId) {
      this.$router.push({
        path: '/creation',
        query: {
          blogId
        }
      })
      // this.$bus.$emit('editBlog',blogId)
    },
    // 删除博客
    cancel(index,blogId) {
      cancelBlog({
        _id: this.$store.state.token._id,
        blogId
      }).then(res => {
        if(res.code === '0') {
          this.$message.success('删除成功')
          this.blogList.splice(index,1)
        }
      })
    },
    // 跳转到博客详情
    toBlogDetail(blogId) {
      this.$router.push('/blogdetail/' + blogId)
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