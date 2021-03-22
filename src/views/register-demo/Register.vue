<template>
  <div id="register">
    <div class="form_register">
      <div class="text">Sign up</div>
      <div class="reg_input">
        <i class="el-icon-user"></i>
        <input type="text" placeholder="username" v-model.lazy="username" @focus="userChange">
      </div>
       <span v-if="isExit">该账号已存在</span>
      <div class="reg_input">
        <i class="el-icon-lock"></i>
        <input type="password" placeholder="password" v-model.lazy="password" @focus="passChange">
      </div>
      <span v-if="isDifferent">密码不一致，请重新输入</span>
      <span v-if="isStandard">密码是由不少于6位的数字和字符组成</span>
      <div class="reg_input">
        <i class="el-icon-lock"></i>
        <input type="password" placeholder="confirm password" v-model="passwordCopy" @focus="passChange">
      </div>
      <span v-if="isDifferent">密码不一致，请重新输入</span>
      <span v-if="isStandard">密码必须包含数字和字母，且在6~18位之间</span>
      <div class="register" @click="handleRegister">注册</div>
    </div>
  </div>
</template>

<script>

import { register } from 'network/user'
import { setToken } from 'network/storage'

export default {
  data(){
    return {
      username: '',
      password: '',
      passwordCopy: '',
      isExit: false, //账号已存在
      isStandard: false, //密码不合规范
      isDifferent: false, //确认密码有误
    }
  },
  methods: {
    handleRegister(){
      //确认密码是否一致
      if(this.password === this.passwordCopy){
        //判断密码是否符合规范
        var reg = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$','gi')
        if(reg.test(this.password)){
          //注册
          register({username: this.username,password:this.password})
          .then((data) => {
            if(data.code == 1){ //账号已存在
              this.isExit = true
            }else if(data.code == 2){//注册失败
              console.log('当前网络不好，请稍后重试')
            }else{//注册成功,存储token
              const token = data.data
              setToken(token)
              //跳转到上一页
              this.$router.back()
              //导航栏变为登录状态
              this.$store.commit('load')
            }
          },(err) => {
            console.log(err)
          })
        }else{
          this.isStandard = true
        }
      }else{
        this.isDifferent = true
      }
    },
    passChange(){
      this.isDifferent = false
      this.isStandard = false
      this.passwordCopy = ''
    },
    userChange(){
      this.isExit = false
    }
  }
}
</script>

<style scoped>
#register{
  height: calc(100vh - 50px);
  width: 100%;

  background-image: url('../../assets/img/login.jpg');
  background-size: cover;
  background-position: center center;
}
.form_register{
  width: 400px;
  height: 300px;
  border-radius: 3px;
  background: rgba(204,204,204,0.5);

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.form_register span{
  margin-left: 50px;
  color: red;
  font-size: 12px;
}

.form_register>div{
  width: 300px;
  position: relative;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
  border-radius: 3px;
  margin-top: 20px;
}
.reg_input{
  height: 30px;
  background: rgb(246,246,246);
}
.reg_input>i{
  width: 40px;
}
.reg_input>input{
  width: 256px;
  height: 28px;
  border: 0px solid transparent;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  
  border-left: 1px solid gainsboro;
  padding-left: 3px;
}

.register{
  height: 30px;
  line-height: 30px;
  color: white;
  background-color: #409EFF;
  font-size: 15px;
}
</style>