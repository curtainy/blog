import request from './request'

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