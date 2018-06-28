import axios from 'axios'
import Vue from 'vue'

let respons = axios.create({
  baseURL:'https://cnodejs.org/api/v1/topics'
});

/**
 * get /topics 主题首页
 * 接收 get 参数
   page Number 页数
   tab String 主题分类。目前有 ask share job good
   limit Number 每一页的主题数量
   mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
 */
export function getList(params) {
  return respons({
    method:"get",
    // 请求携带的参数
    params:{
      tag:params.tab,
      limit:params.limit,
      page:params.page
    }
  })
}

export default {
  install(Vue){
    Vue.prototype.http = {
      getList,
    }
  }
}


