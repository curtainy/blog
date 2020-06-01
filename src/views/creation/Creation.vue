<template>
  <div id="creation">
    <no-load v-if="!$store.state.isLoad"/>
    <div v-else>
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
      <div class="save" @click="handleSave">保存草稿</div>
    </div>
  </div>
</template>

<script>

import { addBlog } from 'network/blog'

import NoLoad from 'components/noload/NoLoad'

import { mavonEditor } from 'mavon-editor'
import "mavon-editor/dist/css/index.css"

export default {
  data(){
    return {
      typeList: ['原创','转载'],
      tagList: ['数据库','前端','后端','运维','大数据','人工智能','算法','其他'],
      type: '',
      title: '',
      category: [],
      tag: [],
      content: ''
    }
  },
  components: {
    mavonEditor,
    NoLoad
  },
  methods: {
    createBlog(type){
      const blog = {
        username: this.$store.state.token.username,
        headImg: this.$store.state.token.headImg,
        type: this.type,
        title: this.title,
        content: this.content,
        tag: this.tag,
        category: this.category,
        thumbs: 0,
        comment: [],
        browse: 0,
        date: new Date().getTime(),
        publish: type
      }
      console.log(blog)
      //将博客保存到数据库中
      addBlog(blog).then((data) => {
        console.log(data)
        //显示保存成功的弹窗
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      })
    },
    handlePublish(){
      this.createBlog(true)
    },
    handleSave(){
      this.createBlog(false)
    }
  }
}
</script>

<style>
#creation{
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
  /* border: 1px solid rgba(102,154,58); */
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