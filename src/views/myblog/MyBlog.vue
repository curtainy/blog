<template>
  <div id="my_blog">
    <no-load v-if="!this.$store.state.isLoad"/>
    <div class="my_blog" v-else>
      <div class="mb_user">
        <span>{{$store.state.token.username}}的博客</span>
        <input type="radio" value="1" v-model="type"><label>已发布</label>
        <input type="radio" value="2" v-model="type"><label>草稿箱</label>
      </div>
      <div class="mb_list">
        <blog-list :blogList="blogList" :isShow="true" 
                   @cancel="cancelBlog" @publish="publishBlog"/>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
// import { cancelBlog, saveToPub } from 'network/blog'
import BlogList from 'components/bloglist/BlogList'
import NoLoad from 'components/noload/NoLoad'

export default {
  data(){
    return {
      type: '1',
      blogList: []
    }
  },
  components: {
    BlogList,
    NoLoad
  },
  computed: {
    ...mapGetters(['getMyBlog']),
  },
  created(){
    this.blogList = this.getMyBlog
  },
  watch: {
    type(){
      if(this.type == '1') this.blogList = this.getMyBlog
      else this.blogList = this.$store.state.noPubBlog
    }
  },
  methods: {
    cancelBlog(title){
      //cancelBlog({username:this.$store.state.token.username,title:title})
       // .then((data) => {
          this.$store.commit('cancelBlog',title)
          this.blogList = this.getMyBlog
      //     this.$message({
      //       type: 'success',
      //       message: data.msg
      //     })
      // })
    },
    publishBlog(username,title){
      //修改数据库中内容
      // saveToPub({username,title}).then((data) => {
      //   console.log(data)
      //   this.$message({
      //     type: 'success',
      //     message: data.msg
      //   })
        //修改store中数据
        this.$store.commit('saveToPub',title)
      //})
    }
  }
}
</script>

<style scoped>
#my_blog{
  width: 70%;
  min-height: calc(100vh - 80px);
  background: white;
  margin-top: 20px;
  margin-left: 15%;
  border-radius: 3px;
  overflow: hidden;
}
.mb_user{
  padding: 20px 0 20px 20px;
  border-bottom: 1px solid rgb(230,230,230);
}
.mb_user>span{
  color: #409EFF;
  font-size: 20px;
  margin-right: 50px;
}
.mb_user>input{
  margin-left: 20px;
}
.mb_user>label{
  margin-left: 5px;
  color: rgb(128,100,135);
  font-size: 15px;
}
.mb_list{
  min-height: 500px;
  background: white;
}
</style>