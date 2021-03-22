import { request, request1 } from './request'

//写博客
export function addBlog(blog){
  return request({
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    url: '/addBlog',
    method: 'post',
    data: blog
  })
}

///我的博客
// export function myBlog(username){
//   return request({
//     url: '/myblog',
//     method: 'get',
//     params: username
//   })
// }

//删除博客
// export function cancelBlog(data){
//   return request1({
//     url: '/cancelblog',
//     method: 'get',
//     params: data
//   })
// }

//修改博客
export function modifyBlog(blog){
  return request({
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    url: '/modifyblog',
    method: 'post',
    data: blog
  })
}

//获取所有博客
export function allBlog(){
  return request1({
    url: '/allblog',
    method: 'get'
  })
}

//将草稿发布
export function saveToPub(data){
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/savetopub',
    method: 'post',
    data
  })
}

//获取用户还未发布的博客
export function noPubBlog(username){
  return request({
    url: '/nopubblog',
    method: 'get',
    params: username
  })
}

//发表评论
export function publishComment(data){
  return request({
    headers: {
      'Content-type': 'application/x-www-form-urlencoded' 
    },
    url: '/publishcomment',
    method: 'post',
    data
  })
}

//访问量+1
export function addBrowse(data){
  return request({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: '/addbrowse',
    method: 'post',
    data
  })
}

// 删除博客
export function cancelBlog(data) {
  return request1({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/cancelblog',
      method: 'post',
      data
  })
}

// 获取发布博客时所需的博客类型
export function getBlogDetail(data) {
  return request1({
      url: '/blogdetail',
      method: 'get',
      params: data
  })
}

// 发布博客
export function publishBlog(data) {
  return request1({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/publishblog',
      method: 'post',
      data
  })
}