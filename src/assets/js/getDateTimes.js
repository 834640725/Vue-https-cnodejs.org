import Vue from 'vue'
let dayjs = require('dayjs');
dayjs().format();

export function getDateTimes(data){
  let datalist = data.data;

  datalist.forEach(item => {

    let items = dayjs(item.last_reply_at).unix();  // 发布时间戳
    let newTimes = dayjs().unix();  // 系统时间戳

    let diffday = newTimes - items;  // 差值时间戳

    item.last_reply_at = diffday;

    /*
    * 1分钟 60s
    * 1小时 3600s
    * 1天   43200s
    * 1周   3024000
    * */
    let t = item.last_reply_at;
    if(t < 60){
      item.last_reply_at = t + ' 秒前'
    }

    else if(60 <= t && t < 3600){
      item.last_reply_at = Math.floor(t / 60) + ' 分钟前'
    }

    else if(3600 <= t && t < 43200){
      item.last_reply_at = Math.floor(t / 3600) + ' 小时前'
    }

    else if(43200 <= t && t < 3024000){
      item.last_reply_at = Math.floor(t / 43200) + ' 天前'
    }
  })

}

export default {
  install(Vue){
    Vue.prototype.getDateTimes = {
      getDateTimes,
    }
  }
}
