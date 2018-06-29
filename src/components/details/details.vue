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
                <span>● 发布于 17 天前</span>
                <span>● 作者: <a href="#" target="_blank">xinyu12345</a></span>
                <span>● 3591 次浏览</span>
                <span>● 来自 分享</span>
              </div>
            </header>

            <div class="article">
              <div class="markdown-text" v-html="userInfo.content">

              </div>
            </div>
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
              this.userInfo = data.data;
              console.log(this.userInfo)
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
