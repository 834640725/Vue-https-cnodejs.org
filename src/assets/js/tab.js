export function tabchange({data}){

  if(!Array.isArray(data)){
    if(data.tab === 'ask'){
      data.tab = '问答'
    }
    else if(data.tab === 'share'){
      data.tab = '分享'
    }
    return;
  }

  data.forEach(item => {
     if(item.tab === 'ask'){
       item.tab = '问答'
     }
     else if(item.tab === 'share'){
       item.tab = '分享'
     }
  })
}
