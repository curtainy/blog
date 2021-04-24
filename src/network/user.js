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



//修改用户头像
// export function updateAvatorUrl(data){
//   return request({
//     headers: {
//       "Content-Type":"application/x-www-form-urlencoded"
//     },
//     url: "/updateAvatorUrl",
//     method: 'post',
//     data
//   })
// }

//修改密码
export function findPassword(data) {
  return request({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/findpassword',
      method: 'post',
      data
  })
}

//发送验证码
export function sendVerificationCode(data) {
  return request({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/sendVerificationCode',
      method: 'post',
      data
  }) 
}

// 比对验证码
export function verificationCode(data) {
  return request({
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    url: '/verificationCode',
    method: 'post',
    data
  })
}

//获取个人中心信息(需要传入userId)
export function getPersonalCenter() {
  return request({
      url: '/personalCenter',
      method: 'get',
      // params: data
  })
}

//修改个人中心信息(需要传入userId)
export function modifyUserInfo(data) {
  return request({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/modifyUserInfo',
      method: 'post',
      data
  })
}

//获取个人页面相关信息
export function getUserInfo(data) {
  return request({
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    url: '/userInfo',
    method: 'post',
    data,
    })
}

// 更新头像
export function changeAvator(data) {
  return request({
      headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
      },
      url: '/changeavator',
      method: 'post',
      data
  })
}

// 新增博客文件夹
export function addBlogCategory(data) {
  return request({
      headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
      },
      url: '/addBlogCategory',
      method: 'post',
      data
  })
}

// 关注
export function toConcern(data) {
  return request({
      headers: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
      url: '/concern',
      method: 'post',
      data
  })
}