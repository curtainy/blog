import request from './request'

// 获取话题正文
export function topicContentList(data) {
  return request({
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
    },
    url: '/topicContentList',
    method: 'post',
    data
  })
}

// 发表话题
export function publishTopic(data) {
  return request({
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
    },
    url: '/publishTopic',
    method: 'post',
    data
  })
}

// 评论
export function topicComment(data) {
  return request({
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    url: '/publishTopic',
    method: 'post',
    data
  })
}

// 举报（博客+话题）
export function report(data) {
  return request({
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    url: '/report',
    method: 'post',
    data
  })
}

// 点赞（博客+话题）
export function thumb(data) {
  return request({
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    url: '/thumb',
    method: 'post',
    data
  })
}