<template>
  <div>
      <header class="header">
        <span class="det-tab">{{userInfo.tab}}</span>
        <!--<span class="det-tab">置顶</span>-->
        <!--<span class="det-title">【头条】第六届 杭州 Node Party 杭电专场开始报名啦</span>-->
        <span class="det-title">{{userInfo.title}}</span>
        <div class="header-info">
          <span>● 发布于 {{userInfo.create_at}}</span>
          <span v-if="userInfo.author">
                ● 作者: <a href="#" target="_blank">{{userInfo.author['loginname']}}</a>
                  </span>
          <span>● {{userInfo.visit_count}} 次浏览</span>
          <span>● 来自 {{userInfo.tab}}</span>
        </div>
      </header>

      <div class="article">
        <div class="markdown-text" v-html="userInfo.content"></div>
      </div>
      <!--评论列表-->
  </div>
</template>

<script>
  // 主题列表组件
    export default {
        name: "topic",
        props:['userInfo'],
        data(){
          return{
            userInfo:userInfo,
          }
        },
      created(){
          console.log(111111)
      }
    }
</script>

<style scoped>

</style>
