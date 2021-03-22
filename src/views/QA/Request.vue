<template>
  <div id="request">
    <no-load v-if="!this.$store.state.isLoad"/>
    <div class="req_content" v-else>
      <input type="text" placeholder="一句话描述清楚问题即可" v-model="title">
      <mavon-editor  ref="editor" v-model="content" class="content"/>
      <!-- <quill-editor v-model="content" class="content"/> -->
      <div class="tag">标签</div>
      <el-select v-model="tag" multiple placeholder="标签" class="more_choose">
          <el-option
            v-for="(item,index) in tagList"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
      </el-select>
      <div class="submit" @click="submit">提交问题</div>
    </div>
  </div>
</template>

<script>

import NoLoad from 'components/noload/NoLoad'
import { mavonEditor } from 'mavon-editor'
// import { addRequest } from 'network/QA'
import "mavon-editor/dist/css/index.css"

export default {
  data(){
    return {
      content: '',
      title: '',
      tagList: ['c语言','C++','Java','JavaScript','Python','Android','IOS','人工智能','前端','后台','数据库','框架'],
      tag: []
    }
  },
  components: {
    NoLoad,
    mavonEditor         
  },
  methods: {
    submit(){
      const request = {
        username: this.$store.state.token.username,
        title: this.title,
        reqContent: this.$refs.editor.d_render,
        tag: this.tag,
        date: new Date().getTime(),
        answer: []
      }
      //console.log(request)

      //addRequest(request).then(data => {
       // if(data.code == 0){
          this.$store.commit('addRequest',request)
        //  this.$message({type: 'success',message: data.msg})
          this.$router.back()
          //清空内容
          this.title = ''
          this.content = ''
          this.tag = ''
        //}
     // })
    }
  }
}
</script>

<style>
#request{
  width: 70%;
  min-height: calc(100vh - 80px);
  background: white;
  margin-top: 20px;
  margin-left: 15%;
  border-radius: 3px;
}
.req_content>input{
  margin-top: 30px;
  width: 90%;
  height: 35px;
  border-radius: 5px;
  border: 1px solid gainsboro;
  margin-left: 5%;
  padding-left: 5px;
}
input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
    color: gainsboro;
    font-size: 16px;
}
.req_content>.content{
  width: 90%;
  margin-left: 5%;
  margin-top: 20px;
  height: 350px;
}
.tag,.submit{
  height: 40px;
  width: 8%;
  border-radius: 5px;
  /* border: 1px solid rgba(102,154,58); */
  background: #409EFF;
  color: white;
  display: inline-block;
  text-align: center;
  line-height: 40px;
  margin-top: 40px;
}
.tag{
  margin-left: 5%;
  margin-right: 5px;
}
.more_choose{
  width: 70%;
}
.submit{
  margin-left: 33px;
}
</style>