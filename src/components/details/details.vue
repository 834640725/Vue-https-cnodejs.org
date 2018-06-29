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
          </div>

          <div class="section-right">
            <!--<div class="r-title">作者</div>-->
            <!--<div class="user_card">-->
              <!--<div class="user-image">-->
                <!--<a href="#" v-if="userInfo.author">-->
                  <!--<img :src="userInfo.author['avatar_url']" alt="">-->
                  <!--<span>{{userInfo.author['loginname']}}</span>-->
                <!--</a>-->
                <!--<p class="big">积分: {{authorData.score}}</p>-->
                <!--<p>此用户没有签名...</p>-->
              <!--</div>-->
            <!--</div>-->
            <Userinfo :score="authorInfo.score" :userInfo="userInfo" v-if="authorInfo.githubUsername">
              <div class="r-title">作者</div>
            </Userinfo>
          </div>
        </section>
    </div>
</template>

<script>

  import {getDateTimes} from '@/assets/js/getDateTimes'
  import {tabchange} from '@/assets/js/tab'

  import Userinfo from '@/iview/authorInfo/authorInfo'

    export default {
      data(){
        return{
          userInfo:{},
          authorInfo:{},  //作者信息
        }
      },
      components:{
        Userinfo,
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
              tabchange(data);
              this.userInfo = data.data;
              return this.userInfo.author['loginname']
            })
           .then((loginname) => {
              this.http.getLoginNames({name:loginname}).then(({data}) => {
                 this.authorInfo = data.data;
              })
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
