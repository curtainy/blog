import request from './request'

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
export function myBlog(username){
  return request({
    url: '/myblog',
    method: 'get',
    params: username
  })
}

//删除博客
export function cancelBlog(data){
  return request({
    url: '/cancelblog',
    method: 'get',
    params: data
  })
}

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
