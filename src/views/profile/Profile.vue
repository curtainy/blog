<template>
  <div>
     <no-load v-if="!this.$store.state.isLoad"/>
     <div class="profile" v-else>
       <div>
          <img :src="userInfo.avatorUrl">
          <div class="imgbtn" @click="chooseImg">修改头像</div>
          <input type="file" class="upload" accept="image/*" @change="handleImg(getImgUrl)">
       </div>
        <div class="pro_msg">
          <div class="msg_top">
             <div>账号：{{userInfo.account}}</div>
             <div>已发表博客：{{userInfo.blogNum}}</div>
             <div>收藏博客数：{{userInfo.collectNum}}</div>
          </div>
          <div class="info base">
          <div class="title">基本信息</div>
          <div class="ctx" v-if="baseShow">
              <div class="ctx-detail">
                    <span class="tag">用户昵称</span>
                    <span class="tag-ctx">{{userInfo.username}}</span>
                    <span class="edit" @click="baseShow = false"><i class="el-icon-edit-outline"></i>编辑</span>
              </div>
               <div class="ctx-detail">
                    <span class="tag">真实姓名</span>
                    <span class="tag-ctx">{{userInfo.realName}}</span>
              </div>
               <div class="ctx-detail">
                    <span class="tag space">性</span>
                    <span class="tag">别</span>
                    <span class="tag-ctx">{{userInfo.sex}}</span>
              </div>
               <div class="ctx-detail">
                    <span class="tag">出生日期</span>
                    <span class="tag-ctx">{{userInfo.birdth}}</span>
              </div>
              <div class="ctx-detail">
                    <span class="tag">个人简介</span>
                    <span class="tag-ctx">{{userInfo.introduce}}</span>
              </div>

          </div>
          <div class="modify" v-else>
              <el-form ref="form" :model="userInfo" label-width="80px">
                <el-form-item label="用户昵称">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="userInfo.realName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="userInfo.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker v-model="userInfo.birdth" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input v-model="userInfo.introduce"></el-input>
                </el-form-item>
            </el-form>
            <div class="btn">
                <el-button @click="baseShow = true" round>取消</el-button>
                <el-button type="primary" round @click="handleModify">保存</el-button>
            </div>
          </div>
      </div>
      <div class="info">
            <div class="title">教育信息</div>
            <div class="ctx" v-if="eductationShow">
                <div class="ctx-detail">
                    <span class="tag">学校名称</span>
                    <span class="tag-ctx">{{userInfo.school}}</span>
                    <span class="edit" @click="eductationShow = false"><i class="el-icon-edit-outline"></i>编辑</span>
                </div>
                <div class="ctx-detail">
                    <span class="tag">入学时间</span>
                    <span class="tag-ctx">{{userInfo.studyDate}}</span>
                </div>
                <div class="ctx-detail">
                    <span class="tag space">学</span>
                    <span class="tag">历</span>
                    <span class="tag-ctx">{{userInfo.record}}</span>
                </div>
                <div class="ctx-detail">
                    <span class="tag space">专</span>
                    <span class="tag">业</span>
                    <span class="tag-ctx">{{userInfo.profession}}</span>
                </div>
            </div>
            <div class="modify" v-else>
              <el-form ref="form" :model="userInfo" label-width="80px">
                <el-form-item label="学校名称">
                    <el-input v-model="userInfo.school"></el-input>
                </el-form-item>
                <el-form-item label="入学时间">
                    <el-date-picker v-model="userInfo.studyDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                 <el-form-item label="学历">
                    <el-select v-model="userInfo.record" placeholder="请选择" style="width: 50%">
                        <el-option :label="item" :value="item" v-for="(item,index) in recordList" :key="index" class="choose"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="userInfo.profession"></el-input>
                </el-form-item>
            </el-form>
            <div class="btn">
                <el-button @click="eductationShow = true" round>取消</el-button>
                <el-button type="primary" round @click="handleModify">保存</el-button>
            </div>
          </div>
      </div>
        </div>
      </div>
  </div>
</template>

<script>

// import { getProfile, updateUser, updateAvatorUrl } from 'network/user'
import NoLoad from 'components/noload/NoLoad'
import { mapGetters } from 'vuex'
import { getPersonalCenter, modifyUserInfo, changeAvator } from 'network/user'

export default {
  data(){
    return {
      // user: {},
      edit: false,
      options: ['高中以下','高中','大专','本科','硕士','博士'],
      baseShow: true,
      userInfo: {
        userId: this.$store.state.token.userId
      },
      eductationShow: true,
      recordList: ['博士后', '博士', 'MBA', '硕士', '本科', '大专', '中专', '中技', '高中', '初中']
    }
  },
  components: {
    NoLoad
  },
  computed: {
    ...mapGetters(['getMyBlog'])
  },
  async mounted() {
        await getPersonalCenter({id: this.$store.state.token.id}).then((res) => {
            if(res.code === '0') {
                this.userInfo = res.data
            }
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
      this.userInfo.avatorUrl = url
      //更新数据库中信息
      changeAvator({id: this.$store.state.token.id,newAvatorUrl:url})
      .then(data => {
        if(data.code === 0){
          //...
        }
      })
    },
    editBtn(){
      this.edit = !this.edit
    },
    cancelBtn(){
      this.edit = !this.edit
    },
    async handleModify() {
            this.baseShow = true
            this.eductationShow = true
            await modifyUserInfo(this.userInfo).then((res) => {
                if(res.code === '0') {
                    this.$message.success('修改成功')
                }
            })
        }
  }
}
</script>

<style scoped lang="less">
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
  visibility: hidden;
}
.imgbtn{
  padding: 10px;
  border-radius: 5px;
  width: 65px;
  display: inline-block;
  background: white;
  color: #409EFF;
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
  color: #409EFF;
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
  background: #409EFF;;
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
.title {
        font-size: 18px;
        padding: 20px 0;
    }
    .base {
        border-bottom: 1px solid #f4f5f6;
    }
    .info {
        // padding: 0 40px;
        .ctx {
            padding-left: 10px;
            margin-bottom: 20px;
            font-size: 16px;
            &:hover {
                background: #fafafc;
                .edit {
                    visibility: visible;
                }
            }
            .ctx-detail {
                padding: 20px 0;
                .tag {
                    color: #818285;
                    margin-right: 40px;
                }
            }
        }
        .edit {
            float: right;
            font-size: 14px;
            color: #409EFF;
            cursor: pointer;
            margin-right: 10px;
            visibility: hidden;
        }
    }
    .modify {
        .btn {
            text-align: center;
            padding-bottom: 20px;
        }
        .el-input {
            width: 50% !important;
        }
    }
</style>