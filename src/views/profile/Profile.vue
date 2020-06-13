<template>
  <div>
     <no-load v-if="!this.$store.state.isLoad"/>
     <div class="profile" v-else>
       <div>
          <img :src="user.headImg">
          <div class="imgbtn" @click="chooseImg">修改头像</div>
          <input type="file" class="upload" accept="image/*" @change="handleImg(getImgUrl)">
       </div>
        <div class="pro_msg">
          <div class="msg_top">
             <div>账号：{{user.username}}</div>
             <div>已发表博客：{{getMyBlog.length}}</div>
             <div>草稿箱：{{this.$store.state.noPubBlog.length}}</div>
          </div>
          <div class="msg_bottom" v-if="!edit">
            <div>姓名：{{user.rname}}<span class="modify_msg" @click="editBtn">修改资料</span></div>
            <div>性别：{{user.sex}}</div>
            <div>生日：{{user.birth | birth}}</div>
            <div>职位：{{user.post}}</div>
            <div>公司：{{user.company}}</div>
            <div>学历：{{user.degree}}</div>
            <div>学校：{{user.college}}</div>
            <div>简介：{{user.profile}}</div>
          </div>
          <div class="msg_bottom" v-else>
            <div>姓名：<input type="text" v-model="user.rname"></div>
            <div>性别：
              <el-radio label="男" v-model="user.sex">男</el-radio>
              <el-radio label="女" v-model="user.sex">女</el-radio>
            </div>
            <div>生日：
              <el-date-picker
                type="date"
                v-model="user.birth"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div>职位：<input type="text" v-model="user.post"></div>
            <div>公司：<input type="text" v-model="user.company"></div>
            <div>学历：
              <el-select placeholder="请选择" v-model="user.degree">
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <div>学校：<input type="text" v-model="user.college"></div>
            <div>简介：<textarea rows="1" cols="20" v-model="user.profile"></textarea></div>
            <div class="cancel_edit" @click="cancelBtn">取消</div>
            <div class="save_edit" @click="saveUser">保存</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

import { getProfile, updateUser } from 'network/user'
import NoLoad from 'components/noload/NoLoad'
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      user: {},
      edit: false,
      options: ['高中以下','高中','大专','本科','硕士','博士'],
    }
  },
  components: {
    NoLoad
  },
  computed: {
    ...mapGetters(['getMyBlog'])
  },
  created(){
    //获取用户详细信息
    getProfile({username:this.$store.state.token.username})
    .then(data => {
      this.user = data.data
      // this.user.headImg = this.user.headImg.replace(/\s/g,'+')
    })
  },
  filters:{
    birth(input){
      if(typeof input == 'string')
      return input.slice(0,10)
    }
  },
  methods: {
     chooseImg(){
      document.getElementsByClassName('upload')[0].click()
    },
    handleImg(callback){
      var fileReader = new FileReader()
      var file = document.getElementsByClassName('upload')[0]
      fileReader.readAsDataURL(file.files[0])
      fileReader.onload = function(){
          //保存图片路径
          callback(fileReader.result)
      }
    },
    getImgUrl(url){
      this.user.headImg = url
      //更新数据库中信息
      // updateHeadImg({username: this.user.username,newHeadImg:url})
      // .then(data => {
      //   if(data.code === 0){
      //     //更新store中的信息
      //     this.$store.commit('updateHeadImg',url)
      //   }
      // })
    },
    editBtn(){
      this.edit = !this.edit
    },
    cancelBtn(){
      this.edit = !this.edit
    },
    saveUser(){
      this.edit = !this.edit
      updateUser({user:this.user}).then(data => {
        this.$message({type:'success',message: data.msg})
      })
    }
  }
}
</script>

<style>
.profile{
  width: 50%;
  margin-left: 20%;
  min-height: calc(100vh - 180px);
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
  background: white;
  padding: 40px 100px;
  font-size: 15px;
  position: relative;
}
.profile>div:first-child{
  height: 150px;
  width: 100px;
  margin-right: 20px;
  display: inline-block;
  position: fixed;
  position: absolute;
  top: 40px;
  left: 120px;
}
.profile img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.upload{
  opacity: 0;
}
.imgbtn{
  padding: 10px;
  border-radius: 5px;
  width: 65px;
  display: inline-block;
  background: white;
  color: rgba(102,154,58);
  cursor: pointer;
}
.pro_msg{
  display: inline-block;
  padding: 14px 0;
  width: 85%;
  padding-left: 150px;
} 
.msg_top>div,.msg_bottom>div{
  margin-top: 15px;
}
.msg_top{
  padding-bottom: 10px;
  border-bottom: 1px solid gainsboro;
}
.modify_msg{
  color: rgba(102,154,58);
  float: right;
  cursor: pointer;
}
.msg_bottom .save_edit,.msg_bottom .cancel_edit{
  display: inline-block;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.education{
  height: 130px;
}
.msg_bottom>.save_edit{
  background: rgba(102,154,58);;
}
.msg_bottom>.cancel_edit{
  background: gainsboro;
  margin-right: 40px;
}
.msg_bottom>div>input,.msg_bottom>div>textarea{
  width: 220px;
  height: 34px;
  border-radius: 5px;
  margin-left: 4px;
  padding-left: 3px;
  border: 1px solid rgba(191,196,204,.5);
}
</style>