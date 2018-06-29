import axios from 'axios'
import Vue from 'vue'

let respons = axios.create({
  baseURL:'https://cnodejs.org/api/v1'
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
    url:'/topics',
    // 请求携带的参数
    params:{
      tab:params.tab,
      limit:params.limit,
      page:params.page
    }
  })
}

/**
 * get /topic/:id 主题详情
 * mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
   accesstoken String 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的
   is_collect 以及 replies 列表中的 is_uped 值。
 */
export function getTopicId(params){
  return respons({
    method:"get",
    url:`/topic/${params.id}`,
    params:{
      'mdrender':params.mk,
      'accesstoken ':params.accesstoken,  //用户登陆
    }
  })
}

export default {
  install(Vue){
    Vue.prototype.http = {
      getList,
      getTopicId
    }
  }
}


