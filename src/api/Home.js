import request from '@/utils/request'

//首页 推荐歌单
export const recommendMusic = params => request({
    url:'/personalized',
    params
})

//首页 最新歌曲
export const newMusic = params => request({
    url:'/personalized/newsong',
    params
})