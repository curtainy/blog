<template>
  <div id="login">
    <form class="login_form">
      <div class="font">Sign In</div>
      <div class="user">
        <div class="up_icon">
          <i class="el-icon-user"></i>
        </div>
        <input type="text" placeholder="username" class="input" v-model.lazy="username">
      </div>
      <span v-if="isError">账号或密码错误</span>
      <div class="pass">
        <div class="up_icon">
          <i class="el-icon-lock"></i>
        </div>
         <input type="password" placeholder="password" class="input" v-model.lazy="password">
      </div>
      <span v-if="isError">账号或密码错误</span>
      <div class="sumbit" @click="handleSumbit">登录</div>
      <div class="other_message">
        <span>忘记密码</span>
        <span @click="noRegister">还未注册</span>
      </div>
    </form>
  </div>
</template>

<script>

// import { login } from 'network/user'

export default {
  data(){
    return {
      username: '',
      password: '',
      isError: false //账号密码是否正确
    }
  },
  methods: {
    handleSumbit(){
      //判断密码是否
    },
    //由登录跳转到注册
    noRegister(){
      this.$router.push('/register')
    }
  }
}
</script>

<style>
#login{
  height: calc(100vh - 50px);
  width: 100%;
  background-image: url("../../assets/img/login.jpg");
  background-size: cover;
  background-position: center center;
}
.login_form{
  height: 300px;
  width: 400px;
  border-radius: 3px;
  background: rgba(204,204,204,0.5);

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.login_form>div{
  position: relative;
  left: 200px;
  transform: translateX(-50%);
  text-align: center;

  height: 30px;
  width: 300px;
  border-radius: 3px;
}
.login_form span{
  color: red;
  font-size: 12px;
  margin-left: 50px;
}
.font{
  padding: 20px 0;
  text-align: center;
}
.user,.pass{
  border: 1px solid gainsboro;
}
.pass{
  margin-top: 20px;
}
.up_icon{
  display: inline-block;
  width: 39px;
  height: 31px;
  background: rgb(246,246,246);

  position: relative;
  top: -7px;

  border-right: 1px solid gainsboro;
}
.up_icon>i{
  position: relative;
  top: 6px;
}
.input{
  height: 28px;
  width: 255px;
  margin-top: 0;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border: 0px solid gainsboro;
  padding-left: 5px;
}
.sumbit{
  line-height: 30px;
  color: white;
  background-color: rgb(0,122,204,0.7);
  font-size: 15px;
  margin-top: 20px;
}
.other_message>span{
  color: gray;
  margin-left: 0;
}
.other_message>span:first-child{
  margin-right: 200px;
}
</style>