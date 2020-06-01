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
