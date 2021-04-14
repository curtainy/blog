import request from './request'

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
