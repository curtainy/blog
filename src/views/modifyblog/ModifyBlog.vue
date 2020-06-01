<template>
  <div id="edit_msg">
     <div class="head">
        <el-select v-model="type" placeholder="类型" class="choose">
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <input type="text" placeholder="标题" v-model="title">
      </div>
      <div class="art_content">
        <mavon-editor  ref="editor" v-model="content" class="content"/>
      </div>
      <div class="other_msg">
        <div class="tag">标签</div>
        <el-select v-model="tag" multiple placeholder="标签" class="more_choose">
          <el-option
            v-for="(item,index) in tagList"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <div class="category">分类</div>
        <el-select v-model="category" multiple placeholder="分类" class="more_choose">
          <el-option
            v-for="(item,index) in tagList"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="publish" @click="handlePublish">发布文章</div>
      <div class="save" @click="handleBack">取消修改</div>
  </div>
</template>

<script>

import { modifyBlog } from 'network/blog'

import { mavonEditor } from 'mavon-editor'
import "mavon-editor/dist/css/index.css"

export default {
  data(){
    return {
      typeList: ['原创','转载'],
      tagList: ['数据库','前端','后端','运维','大数据','人工智能','算法','其他'],
      type: '原创',
      title: '',
      category: [],
      tag: [],
      content: '',
      blog: '',
      oldTitle: ''
    }
  },
  components: {
    mavonEditor
  },
  activated(){
    const title = this.$route.params.title
    const blog = this.$store.state.myBlog.filter(elemnet => {
      return elemnet.title === title
    });
    this.blog = blog[0]
    this.type = blog[0].type
    this.title = blog[0].title
    this.oldTitle = blog[0].title
    this.category = blog[0].category
    this.tag = blog[0].tag
    this.content = blog[0].content
  },
  methods: {
    createBlog(type){
      const blog = {
        username: this.$store.state.token.username,
        headImg: this.$store.state.token.headImg,
        type: this.type,
        oldTitle: this.oldTitle,
        title: this.title,
        content: this.content,
        tag: this.tag,
        category: this.category,
        thumbs: this.blog.thumbs,
        comment: this.blog.comment,
        browse: this.blog.browse,
        date: new Date().getTime(),
        publish: type
      }
      // console.log(blog)
      //将博客保存到数据库中
      modifyBlog(blog).then((data) => {
        // console.log(data)
        //将博客保存到store中
        this.$store.commit('modifyBlog',blog)
        //显示保存成功的弹窗
        this.$message({
          type: 'success',
          message: data.msg
        })
        //跳转到详情页面
        this.$router.push({
          path: '/detailblog',
          query: {
            blog
          }
        })
      })
    },
    handlePublish(){
      this.createBlog(true)
    },
    handleBack(){
      this.$router.back()
    }
  }
}
</script>

<style>
#edit_msg{
  width: 70%;
  margin-left: 15%;
  padding-top: 30px;
}
.choose{
  width: 10%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 0;
}

.head>input{
  width: 88%;
  height: 35px;
  border-radius: 5px;
  border: 1px solid gainsboro;
  margin-left: 6px;
  padding-left: 5px;

  position: relative;
  top: 2px;
}
input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
    color: gainsboro;
    font-size: 16px;
}
.art_content{
  margin-top: 20px;
  width: 100%;
}
.content{
  height: 400px;
}
.tag,.category{
  height: 38px;
  width: 7%;
  border-radius: 5px;
  background: rgba(102,154,58);
  color: white;
  display: inline-block;
  text-align: center;
  line-height: 35px;
  margin-right: 2px;
  margin-top: 20px;
}
.category{
  margin-left: 15.5%;
}
.more_choose{
  width: 35%;
}
.save,.publish{
  width: 80px;
  height: 35px;
  margin-top: 20px;
  float: right;
  border-radius: 5px;

  text-align: center;
  line-height: 35px;
  background: rgba(102,154,58);
  color: white;
}
.save{
  margin-right: 3%;
}
.publish{
  position: relative;
  left: -3px;
}
</style>