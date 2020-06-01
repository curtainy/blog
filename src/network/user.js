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