export function tabchange({data}){
  data.forEach(item => {
     if(item.tab === 'ask'){
       item.tab = '问答'
     }
     else if(item.tab === 'share'){
       item.tab = '分享'
     }
  })
}
