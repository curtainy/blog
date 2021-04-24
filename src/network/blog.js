import request from './request'

//写博客
// export function addBlog(blog){
//   return request({
//     headers: {
//       "Content-Type":"application/x-www-form-urlencoded"
//     },
//     url: '/addBlog',
//     method: 'post',
//     data: blog
//   })
// }

// 删除博客
// export function cancelBlog(data){
//   return request1({
//     url: '/cancelblog',
//     method: 'get',
//     params: data
//   })
// }

//修改博客
// export function modifyBlog(blog){
//   return request({
//     headers: {
//       "Content-Type":"application/x-www-form-urlencoded"
//     },
//     url: '/modifyblog',
//     method: 'post',
//     data: blog
//   })
// }

//获取博客列表
export function allBlog(data){
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/allblog',
    method: 'post',
    data
  })
}

// 获取博客详情
export function blogDetail(data) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/edublog/blogs/blogDetail',
    method: 'post',
    data
  })
}


//发表评论
export function publishComment(data){
  return request({
    headers: {
      'Content-type': 'application/x-www-form-urlencoded' 
    },
    url: '/publishComment',
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
    url: '/blogCategory',
    method: 'post',
    data
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
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/publishBlog',
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
      url: '/collectBlog',
      method: 'post',
      data
  })
}