import request from './request'

//写博客
export function addBlog(blog){
  return request({
    url: '/addBlog',
    method: 'post',
    data: blog
  })
}
