<template>
  <div>
    <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" @input="inputFn" />
    <!-- 搜索下容器 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 搜索关键词 -->
        <span class="hot_item" 
        v-for="(obj,index) in hotArr" 
        :key="index"
        @click="fn(obj.first)"
        >{{obj.first}}</span>
      </div>
    </div>

<!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<!-- <van-cell center :title="obj.name" :label="obj.ar[0].name 
  + '-' + obj.name" v-for="obj in resultList" :key=obj.id>
  <template #right-icon>
    <van-icon name="play-circle-o" size="1.5rem"/>
  </template>
  </van-cell> -->
  <SongItem v-for="obj in resultList"
  :key="obj.id" :name="obj.name"
  :author="obj.ar[0].name" :id="obj.id"
  ></SongItem>
</van-list>
      
    </div>
    
  </div>
</template>

<script>
import {hotSearchAPI,searchResultListAPI} from '@/api'
import SongItem from '@/components/SongItem.vue'
export default {
  data(){
    return{
      value:"",
      hotArr:[],
      resultList:[],
      loading:false, //加载中(状态) - 只有为false,才能触底后自动触发onload方法
      finished:false, //为加载全部(如果设置为true,底部就不会再次执行onload,代表全部加载完成 )
      page:1,
      timer:null
    }
  },
  components:{
  SongItem
  },
  async created(){
    const res = await hotSearchAPI()
    console.log(res)
    this.hotArr=res.data.result.hots
  },
  methods:{
    async getListFn(){
      //把搜索结果return出去
      return await searchResultListAPI({
        keywords:this.value,
        limit:20,
        offset:(this.page-1)*20 //页码跳转固定公式 
      })
    },
    async fn(val){ //点击热搜关键词
      this.page=1; //点击重新获取第一页数据
      this.finished=false; //重新设置可加载更多，防止因“没有数据"或“只有一页数据”而造成更新后无法加载更多数据
      this.value=val; //选中的关键词显示到搜索框
      const res =await this.getListFn()
      console.log(res);
      this.resultList=res.data.result.songs;
      this.loading=false //加载完成
    },
    //目标：搜索框
    //1.@input给van-search绑定事件
    //2.@input事件中，获取搜索结果保存resultList中
    //3.判断如果搜索关键字为空(.length === 0),
    //数组清空，阻止网络请求执行(提前return)
    async inputFn(){
      //防抖
      if(this.timer) clearTimeout(this.timer) //如果之前已经存在定时器，则清除旧定时器，执行以下新定时器
      this.timer=setTimeout(async()=>{
        this.page=1; //点击重新获取第一页数据
         this.finished=false; //重新设置可加载更多
    //判断如果搜索关键字为空(.length === 0),
    //数组清空，阻止网络请求执行(提前return)
      if(this.value.length === 0){
        this.resultList=[];
        return
      }
      const res = await this.getListFn()
      console.log(res);
      if(res.data.result.songs===undefined){ //没有数据
        this.resultList=[]
        return
      }
      this.resultList=res.data.result.songs;
      this.loading=false //加载完成
      },900)
     
    },
    //目标：加载更多
    //1.集成list组件-定义相关的变量(搞懂变量的作用) -监测触底事件
    //2.一旦触底，自动执行onLoad方法
    //3.对 page++，给后台传递offset偏移量参数-请求下一页的数据
    //4.把当前数据和下一页的数据拼接起来用在当前页面的数组里
    async onLoad(){ //触底事件(加载下一页数据)
      this.page++;
      const res=await this.getListFn()
      if(res.data.result.songs===undefined){ //只有一页数据
        this.finished=true; //只要设置为true,list再次触发都不会执行onLoad
        this.loading=false //加载完成
        return
      }
      this.resultList=[...this.resultList,...res.data.result.songs];
      this.loading=false;
    }
    
  }
}
</script>

<style scoped>
.van-cell{
  border-bottom: 1px solid lightgray;
}
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

</style>>
