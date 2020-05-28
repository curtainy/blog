import request from './request'

//注册
export function register(data){
  return request({
    url: '/register',
    method: 'post',
    data
  })
}