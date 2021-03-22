<template>
  <div class="blog-detail">
    <div class="blog-header">
      <el-avatar :size="45" :src="blog.avatorUrl" style="margin-right: 5px"></el-avatar>
      <div class="name">{{blog.nickName}}</div>
      <div class="time">{{blog.createTime}}</div>
      <el-button type="primary" plain size="small" class="to-fans">关注</el-button>
      <el-button plain  size="small" class="to-fans" @click="cancelConcern(user.userId,user)" v-if="user.concern">取关</el-button>
      <el-button plain  size="small" class="to-fans" @click="handleConcern(user.userId,user)" v-else>关注</el-button>
    </div>
    <div class="blog-content">{{blog.content}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: {}
    }
  },
  created() {
    this.$bus.$on('blogDetail', (blog) => {
      console.log(blog)
      this.blog = blog
      console.log(this.blog)
    })
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.blog-detail {
  padding: 20px;
  .blog-header {
    position: relative;
    & > div {
      display: inline-block;
      position: absolute;
    }
    .name {
      left: 55px;
      top: 5px;
    }
    .time {
      left: 55px;
      top: 30px;
      font-size: 14px;
      color: rgb(174, 175, 177);
    }
    .to-fans {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  .blog-content {
    // border: 1px solid black;
    padding: 30px 0 20px 0;
    border-bottom: 1px solid rgb(245, 242, 242);
  }
}
</style>