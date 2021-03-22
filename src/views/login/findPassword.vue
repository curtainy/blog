<template>
  <div class="find">
      <div>
            <div class="text">修改密码</div>
            <el-form :model="ruleForm" label-position="left" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
                <el-input v-model.number="ruleForm.account"></el-input>
            </el-form-item>
            <template v-if="isShow">
                <el-form-item label="验证码" prop="verificationCode" class="code">
                    <el-input type="password" v-model.number="ruleForm.verificationCode" autocomplete="off"></el-input>
                    <el-button type="primary" :disabled="isSend" @click="getVerificationCode">{{buttonText}}</el-button>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="confirm">确认</el-button>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="ruleForm.password2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                </el-form-item>
            </template>
        </el-form>
      </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'
import { findPassword, sendVerificationCode, verificationCode } from 'network/user'
import { setToken } from 'network/storage'

export default {
    data() {
        const checkAccount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'))
            }
            setTimeout(() => {
                if(!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'))
                } else if(value.toString().length != 11) {
                    callback(new Error('请输入11位手机号'))
                } else {
                    callback()
                }
            },1000)
        }
        const checkPassWord = (rule, value, callback) => {
            if(value == '') {
                callback(new Error('请输入密码'))
            } else {
                const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
                if(reg.test(value)){
                    this.$refs.ruleForm.validateField('password2')
                } else {
                    callback(new Error('密码由数字和字母组成，长度在8-16位之间'))
                }
                callback()
            }
        }
        const checkPassWord2 = (rule, value, callback) => {
            if(value == '') {
                callback(new Error('请再次输入密码'))
            } else if(value != this.ruleForm.password) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }
        return {
            isShow: true,
            ruleForm: {
                account: '',
                password: '',
                verificationCode: '',
                password2: ''
            },
            rules: {
                account: [
                    {validator: checkAccount, trigger: 'blur'}
                ],
                password: [
                    {validator: checkPassWord, trigger: 'blur'}
                ],
                password2: [
                    {validator: checkPassWord2, trigger: 'blur'}
                ]
            },
            buttonText: '点击发送验证码',
            isSend: false,
        }
    },
    methods: {
        ...mapMutations(['changeLoad', 'getUserInfo']),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    findPassword(Object.assign(this.ruleForm,{
                        role: 'user'
                    })).then((res) => {
                        if(res.code === '0') {
                            this.changeLoad()
                            this.getUserInfo(res.data)
                            this.$message.success('修改成功')
                            setToken(res.data)
                            this.$router.push('/home')
                        }
                    })
                }
            })
        },
        getVerificationCode() {
            this.isSend = true
            sendVerificationCode({account: this.ruleForm.account}).then((res) => {
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
        confirm() {
            verificationCode({
                account: this.ruleForm.account,
                verificationCode: this.ruleForm.verificationCode
            }).then((res) => {
                if(res.code === '0') this.isShow = !this.isShow
                else this.$message.error('验证码错误')
            })
            
        }
    }
}
</script>

<style scoped lang="less">
.find {
    height: 100vh;
    background: url("~assets/img/bg.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
        font-size: 22px;
        margin-bottom: 50px;
        text-align: center;
        color: rgb(107, 106, 106);
    }
    .btn {
        .el-button {
            width: 100% !important;
            display: inline;
        }
        .reset {
            margin-left: 14px;
        }
    }
    &>div {
        min-width: 500px;
        margin-top: 15%;
        width: 25%;
        padding: 40px;
        background: #fff;
        border-radius: 3px;
    }
}
.find {
    .code {
        .el-input {
            width: 57% !important;
            margin-right: 10px;
        }
    }
}
</style>