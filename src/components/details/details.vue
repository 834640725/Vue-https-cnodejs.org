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
                  ● 作者: <a href="#" target="_blank" @click.prevent="clickUser(userInfo)">{{userInfo.author['loginname']}}</a>
                </span>
                <span>● {{userInfo.visit_count}} 次浏览</span>
                <span>● 来自 {{userInfo.tab}}</span>
              </div>
            </header>

            <div class="article">
              <div class="markdown-text" v-html="userInfo.content"></div>
            </div>

            <div class="user-replies">
              <header class="rep-header">{{userInfo.reply_count}} 回复</header>
              <ul class="rep-list">
                <li v-for="(item,index) in userInfo.replies">
                   <div @click="clickUser(item)">
                     <img :src="item.author['avatar_url']" alt="" class="rep-image">
                     <strong>{{item.author['loginname']}} <a href="#" @click.prevent>{{index+1}}楼● 2 天前 </a></strong>
                   </div>
                   <div class="mkdown-text" v-html="item.content"></div>
                  <div class="asslogin">
                    <span class="thumbs-up">
                      <a href="#" @click.prevent="clickFabulous(item)" v-if="!item.is_uped">点赞</a>
                      <a href="#" @click.prevent="clickFabulous(item)" v-if="item.is_uped">取消</a>
                      <i>{{item.ups.length}}</i>
                    </span>
                    <span><a href="#">回复</a></span>
                  </div>

                  <!--接下来该写markdown文本编辑器和登陆-->

                </li>
              </ul>
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
            <Userinfo :authorInfo="authorInfo" v-if="authorInfo.githubUsername">
              <div class="r-title">作者</div>
            </Userinfo>
          </div>
        </section>
    </div>
</template>

<script>

  import {getDateTimes} from '@/assets/js/getDateTimes'
  import {tabchange} from '@/assets/js/tab'
  import Cookies from 'js-cookie'

  import Userinfo from '@/iview/authorInfo/authorInfo'

    export default {
      data(){
        return{
          userInfo:{},   // 评论数据 replies
          authorInfo:{},  //作者信息
        }
      },
      methods:{
        clickUser(obj){
          let userLoginname = obj.author['loginname'];
          this.$router.push({path:`/user/${userLoginname}`})
        },

        // 点赞
        clickFabulous(obj){


          let isLogin = this.$store.state.userLogin;
          if(isLogin){
            /**
             *@ AccessToken String
             *@ reply_id  params
             */

              // cookie中存储的用户id和评论中的用户id不一致,通过名称判断
            let youSelf = this.$store.state.youSelf;
            // 判断不能自己给自己的评论点赞
            if(youSelf.loginname === obj.author['loginname']){
               alert('哈哈哈,自己给自己点赞被我逮到了~~~');
               return;
            }


            obj.is_uped = !obj.is_uped;

            let accesstoken = this.$store.state.usersaveAccess;
            let id = obj.id;
            let params = {
              accesstoken,
              id,
            };

            this.http.getFabulous(params).then(({data}) => {
                if(data.action === 'up'){
                  // 点赞
                  obj.ups.push(obj.id)
                }else{
                  obj.ups = obj.ups.filter(item => item !== obj.id);
                }
            })

          }else{
            this.$router.push({path:'/login'})
          }
        }
      },
      components:{
        Userinfo,
      },

      computed:{

      },
      created(){
        //accesstoken String 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 is_collect           以及 replies 列表中的 is_uped 值。
         let id = this.$route.params.id;
         let params = {
           id,
           mk:true,
           accesstoken:this.$store.state.usersaveAccess,
         };
         if(id){
            this.http.getTopicId(params).then(({data}) => {
              getDateTimes(data,'create_at');
              tabchange(data);
              this.userInfo = data.data;
              console.log(this.userInfo);
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
