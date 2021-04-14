import request from './request'

// 取消收藏的博客
export function cancelCollect(data) {
    return request({
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        url: '/cancelCollect',
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