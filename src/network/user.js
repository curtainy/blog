import { request, request1 } from './request'

//注册
export function register(data){
  return request({
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    url: '/register',
    method: 'post',
    data
  })
}

//登录
export function login(data){
  return request({
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    url: '/login',
    method: 'post',
    data
  })
}

//获取用户详细信息
export function getProfile(username){
  return request({
    url: '/profile',
    method: 'get',
    params: username
  })
}

//修改用户信息
export function updateUser(data){
  
  return request({
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    url: '/updateuser',
    method: 'post',
    data
  })
}

//修改用户头像
export function updateHeadImg(data){
  return request({
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    url: "/updateHeadimg",
    method: 'post',
    data
  })
}

//修改密码
export function findPassword(data) {
  return request1({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/findpassword',
      method: 'post',
      data
  })
}

//发送验证码
export function sendVerificationCode(data) {
  return request1({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/sendVerificationCode',
      method: 'post',
      data
  }) 
}

// 比对验证码
export function VerificationCode(data) {
  return request1({
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    url: '/verificationCode',
    method: 'post',
    data
  })
}

//获取个人中心信息(需要传入userId)
export function getPersonalCenter() {
  return request1({
      url: '/personalcenter',
      method: 'get',
      // params: data
  })
}

//修改个人中心信息(需要传入userId)
export function modifyPersonCenter(data) {
  return request1({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/modifypersonalcenter',
      method: 'post',
      data
  })
}

//获取个人页面相关信息
export function getUserDetail() {
  return request1({
      url: '/userdetail',
      method: 'get',
  })
}

// 更新头像
export function changeAvator(data) {
  return request1({
      headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
      },
      url: '/changeavator',
      method: 'post',
      data
  })
}