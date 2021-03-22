import { request1 } from './request'

// 取消收藏的博客
export function cancelCollect(data) {
    return request1({
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        url: '/cancelcollect',
        method: 'post',
        data
    })
}