//api文件夹下 各个请求模块js，都统一来到index.js再向外导出
import { recommendMusic , newMusic } from "./Home";
import {hotSearch, searchResultList} from "./Search";
import {getSongById,getLyricById} from './Play'

export const recommendMusicAPI = recommendMusic
export const newMusicAPI = newMusic

//搜索页面
export const hotSearchAPI = hotSearch

//搜索结果页面
export const searchResultListAPI = searchResultList

//歌曲-播放地址
export const getSongByIdAPI=getSongById
//歌曲-歌词数据
export const getLyricByIdAPI=getLyricById