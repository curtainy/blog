import request from './request'
import qs from 'qs'

const baseURL = '/edublog/blogs/'

//获取博客列表
export function allBlog(data){
  return request({
    headers : {
      'Content-type': 'application/x-www-form-urlencoded' 
    },
    url: `${baseURL}allBlog`,
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取博客详情
export function blogDetail(data) {
  return request({
    headers : {
      'Content-type': 'application/x-www-form-urlencoded' 
    },
    url: `${baseURL}blogDetail`,
    method: 'post',
    data: qs.stringify(data)
  })
}


//发表评论
export function publishComment(data){
  return request({
    headers: {
      'Content-type': 'application/json' 
    },
    url: `${baseURL}publishComment`,
    method: 'post',
    data
  })
}

// 获取博客分类
export function getBlogCategory(data) {
  return request({
    headers: {
      'Content-type': 'application/x-www-form-urlencoded' 
    },
    url: `${baseURL}blogCategory`,
    method: 'post',
    data: qs.stringify(data)
  })
} 

// 删除博客
export function cancelBlog(data) {
  return request({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/cancelBlog',
      method: 'post',
      data
  })
}

// 获取发布博客时所需的博客类型
// export function getBlogDetail(data) {
//   return request1({
//       url: '/blogdetail',
//       method: 'get',
//       params: data
//   })
// }

// 发布博客
export function publishBlog(data) {
  return request({
    headers: {
      'Content-type': 'application/json' 
    },
    url: `${baseURL}publishBlog`,
    method: 'post',
    data
  })
}


// 收藏
export function collectBlog(data) {
  return request({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/edublog/collect/collectBlog',
      method: 'post',
      data: qs.stringify(data)
  })
}