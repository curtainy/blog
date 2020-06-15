import request from './request'

export function getAllQA(){
  return request({
    url: '/allQA',
    method: 'get'
  })
}

export function addRequest(data){
  return request({
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'
    },
    url: '/addrequest',
    method: 'post',
    data
  })
}

export function addAnswer(data){
  return request({
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'
    },
    url: '/addanswer',
    method: 'post',
    data
  })
}