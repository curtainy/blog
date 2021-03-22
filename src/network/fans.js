import { request1 } from './request'

// 关注
export function toConcern(data) {
    return request1({
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        url: '/concern',
        method: 'post',
        data
    })
}

// 取消关注
export function cancelConcern(data) {
    return request1({
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        url: '/concern',
        method: 'post',
        data
    })
}