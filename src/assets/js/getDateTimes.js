import Vue from 'vue'
let dayjs = require('dayjs');
dayjs().format();

/**
 *
 * @param obj Object
 * @param key String
 */
function convert(obj,key){

    let timesd = obj[key];

    let items = dayjs(timesd).unix();
    let newTimes = dayjs().unix();  // 系统时间戳
    let diffTime = newTimes - items;  // 差值时间戳
    let day = parseInt(diffTime / 86400);

    obj[key] = day;
    let t = obj[key];

    if(t <= 7 && t >= 1){
      obj[key] = t + ' 天前'
    }
    else if(t > 7 && t < 14){
      obj[key] = "1 周前"
    }
    else if(t >= 14 && t < 21){
      obj[key] = "2 周前"
    }
    // 3周前
    else if(t >= 21 && t < 28){
      obj[key] = "3 周前"
    }
    //4 周前
    else if(t >= 28 && t <= 31){
      obj[key] = "4 周前"
    }

    else if(t > 31){
      let dateObj = items;
      // 获取到 2018/4/10格式的时间
      let newTimer = new Date(dateObj*1000).toLocaleString().split(' ')[0].split('/').join(' /');
      obj[key] = newTimer;
    }

    else if(t >= 0 && t < 1) {
      // 计算小时 1 <= h < 24
      let hours = parseInt(diffTime / 3600);
      if (1 <= hours && hours < 24) {
        obj[key] = hours + ' 小时前'
      }

      if( 0 <= hours && hours < 1) {
        let minutes = parseInt(diffTime / 60);
        obj[key] = minutes + ' 分钟前'

        if(minutes < 1){
          obj[key] = diffTime + ' 秒前'
        }
      }
    }
}



export function getDateTimes(data){
  let datalist = data.data;

  if(!Array.isArray(datalist)){
    convert(datalist,'create_at');
    return;
  }

  // 转换时间格式数据为数组
  datalist.forEach(item => {
    convert(item,'last_reply_at')
  })


}

export default {
  install(Vue){
    Vue.prototype.getDateTimes = {
      getDateTimes,
    }
  }
}
