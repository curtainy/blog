<template>
  <div class="login">
      <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo login-menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="0" class="login-item">免密登陆</el-menu-item>
            <el-menu-item index="1" class="login-item">密码登陆</el-menu-item>
        </el-menu>
        <el-form :model="noPass" label-position="left" status-icon label-width="70px" class="demo-ruleForm no-pass" v-if="isPass">
            <el-form-item label="账号" prop="account">
                <el-input v-model.number="noPass.account"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verificationCode" class="code">
                <el-input type="password" v-model.number="noPass.verificationCode" autocomplete="off"></el-input>
                <el-button type="primary" :disabled="isSend" @click="getVerificationCode">{{buttonText}}</el-button>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="primary" @click="loginNoPass">登陆</el-button>
            </el-form-item>
        </el-form>
        <el-form :model="pass" label-position="left" status-icon label-width="70px" class="demo-ruleForm" v-else>
            <el-form-item label="账号" prop="account">
                <el-input v-model.number="pass.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="code">
                <el-input type="password" v-model="pass.password"></el-input>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="primary" @click="loginByPass">登陆</el-button>
                <span class="forget" @click="forget">忘记密码</span>
                <span class="no-account" @click="toRegister">没有账号</span>
            </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'
import { login, sendVerificationCode } from 'network/user' 
import { setToken } from 'network/storage'

export default {
    name: 'login', 
    data() {
        return {
            activeIndex: '0',
            isPass: true,
            noPass: {
                account: '',
                verificationCode: ''
            },
            buttonText: '点击发送验证码',
            isSend: false,
            pass: {
                account: '',
                password: ''
            },
        }
    },
    methods: {
        ...mapMutations(['changeLoad', 'getUserInfo']),
        handleSelect(key) {
            if(key === '0') this.isPass = true
            else this.isPass = false
        },
        getVerificationCode() {
            this.isSend = true
            sendVerificationCode({account: this.noPass.account}).then((res) => {
                if(res.code === '0') {
                    this.countDown()
                }
            })
        },
        countDown() {
            var count = 60
            var timer = setInterval(() => {
                if(count !== 1) {
                    count--
                    this.buttonText = `${count}s后重新发送`
                } else {
                    clearInterval(timer)
                    this.isSend = false
                    this.buttonText = '点击发送验证码'
                }
            },1000)
        },
        loginByPass() {
            login(Object.assign(this.pass, {
                role: 'user'
            })).then((res) => {
                if(res.code === '0') {
                    this.changeLoad()
                    this.getUserInfo(res.data)
                    this.$message.success('登陆成功')
                    setToken(res.data)
                    this.$router.push('/home')
                } else {
                    this.$message.success('账号或密码错误')
                }
            })
        },
        loginNoPass() {
            login(Object.assign(this.noPass, {
                role: 'user'
            })).then((res) => {
                if(res.code === '0') {
                    this.changeLoad()
                    this.getUserInfo(res.data)
                    this.$message.success('登陆成功')
                    setToken(res.data)
                    this.$router.push('/home')
                } else {
                    this.$message.success('验证码错误')
                }
            })
        },
        toRegister() {
            this.$router.push('/register')
        },
        forget() {
            this.$router.push('/findpassword')
        }
    }
}
</script>

<style lang="less">
.login {
    height: 100vh;
    background: url("~assets/img/bg.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
        .el-button {
            width: 100% !important;
        }
        .forget, .no-account {
            font-size: 12px;
            color: rgb(79, 118, 247);
            cursor: pointer;
        }
        .forget{
            float: right;
        }
        .no-account {
            float: left;
        }
    }
}
.login>div{
    min-width: 500px;
    margin-top: 5%;
    width: 25%;
    padding: 40px;
    background: #fff;
    // box-shadow: rgb(212, 209, 209) 0px 0px 10px;
    border-radius: 3px;
}
.login-menu {
    display: flex;
    text-align: center;
    margin-bottom: 50px;
    .login-item {
        flex: 1;
        font-size: 16px;
    }
}
.no-pass {
    .code {
        .el-input {
            width: 57% !important;
            margin-right: 10px;
        }
    }
}
</style>