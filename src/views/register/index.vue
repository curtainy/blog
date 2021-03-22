<template>
  <div class="register">
      <div>
        <div class="text">注册账号</div>
        <el-form :model="ruleForm" label-position="left" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
                <el-input v-model.number="ruleForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
                <el-input type="password" v-model="ruleForm.password2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                <el-button type="info" @click="resetForm('ruleForm')" class="reset">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'
import { register } from 'network/user'
import { setToken } from 'network/storage'

export default {
    name: 'register',
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
            ruleForm: {
                account: '',
                password: '',
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
            }
        }
    },
    methods: {
        ...mapMutations(['changeLoad']),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    register(Object.assign(this.ruleForm, {
                        role: 'user'
                    })).then((res) => {
                        if(res.code === '0') {
                            this.changeLoad()
                            this.getUserInfo(res.data)
                            this.$message.success('注册成功')
                            setToken(res.data) 
                            this.$router.push('/home')
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style scoped lang="less">
.register {
    height: 100vh;
    background: url("~assets/img/bg.jpg");
    background-size: cover;
    .text {
        font-size: 22px;
        margin-bottom: 50px;
        text-align: center;
        color: rgb(107, 106, 106);
    }
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
        .el-button {
            width: 48% !important;
            display: inline;
        }
        .reset {
            margin-left: 14px;
        }
    }
}
.register>div{
    min-width: 500px;
    margin-top: 15%;
    width: 25%;
    padding: 40px;
    background: #fff;
    border-radius: 3px;
    // box-shadow: rgb(212, 209, 209) 0px 0px 10px;
}
</style>