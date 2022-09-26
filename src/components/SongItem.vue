<template>
<!-- 封装播放列表复用组件 -->
  <van-cell center :title="name" :label="author
  + '-' + name" >
  <template #right-icon>
    <van-icon name="play-circle-o" size="1.5rem" @click="playFn"/>
  </template>
  </van-cell>
</template>

<script>
export default {
    props:{
        name:String,
        author:String,
        id:Number //歌曲id，标记歌曲，为将来跳转播放页做准备
    },
    methods:{
        playFn(){
            this.$router.push({
                path:'/play',
                query:{
                    id:this.id //歌曲id，通过路由跳传过去
                }
            })
        }
    },
}
</script>

<style scoped>
.van-cell{
  border-bottom: 1px solid lightgray;
}
</style>