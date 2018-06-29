<template>
    <div class="details-content">
        <section class="section clearfix">
          <div class="section-left">
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

          <div class="section-right">
            <div class="r-title">作者</div>
            <div class="user_card">
              <div class="user-image">
                <a href="#">
                  <img src="../../assets/images/icon1.png" alt="">
                  <span>xinyu12345</span>
                </a>
                <p class="big">积分: 395</p>
                <p>杭州大搜车,狂招Node.js服务端</p>
              </div>
            </div>
          </div>
        </section>
    </div>
</template>

<script>

  import {getDateTimes} from '@/assets/js/getDateTimes.js'

    export default {
      data(){
        return{
          userInfo:{},
        }
      },
      created(){
         let id = this.$route.params.id;
         let params = {
           id,
           mk:true,
           accesstoken:''
         };
         if(id){
           this.http.getTopicId(params).then(({data}) => {
              getDateTimes(data);
              this.userInfo = data.data;
           })
         }else{
           this.$router.push({path:'/index'})
         }
      }
    }
</script>

<style lang="less">
  @import "../../assets/less/details";
</style>
