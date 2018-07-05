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
              <div class="userEdit"
                   title="编辑"
                   v-if="userInfo.author_id === user_id"
                   @click="editClick"
              ></div>
              <span
                v-if="userInfo.title && this.$store.state.userLogin"
                :class="[userInfo['is_collect'] ? 'cancel_collect' : '','is_collect']"
                @click="clickCollect"
              ></span>
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
                     <strong>{{item.author['loginname']}} <a href="#" @click.prevent>{{index+1}}楼● {{item.create_at}} </a></strong>
                   </div>
                   <div class="mkdown-text" v-html="item.content"></div>
                  <div class="asslogin">
                    <span class="thumbs-up">
                      <a href="#" @click.prevent="clickFabulous(item)" v-if="!item.is_uped">点赞</a>
                      <a href="#" @click.prevent="clickFabulous(item)" v-if="item.is_uped">取消</a>
                      <i>{{item.ups.length}}</i>
                    </span>
                    <span><a href="#" @click.prevent="toClickReply(item)">回复</a></span>
                  </div>

                  <mavon-editor
                    v-if="userNameReply === item.id"
                    codeStyle="arta"
                    v-model="userreply"
                    fontSize="14"
                    :boxShadow="false"
                    defaultOpen="edit"
                    :toolbarsFlag="true"
                    :toolbars="toolbars"
                    :scrollStyle="true"
                    style="border: none;border-top: #778087; margin-top: 6px;"
                    ref="refValue"
                  >
                  </mavon-editor>
                  <span class="is_rely" v-if="userNameReply === item.id" @click="ISREPLY_NOW(item)">回复</span>


                </li>
              </ul>
              <div class="reply" v-if="this.$store.state.userLogin">

                <header class="reply-header">
                  添加回复
                  <span class="clickbtn" @click="clickReply">回复</span>
                </header>
                <div>
                    <mavon-editor
                      codeStyle="arta"
                      v-model="value"
                      fontSize="14"
                      :boxShadow="false"
                      defaultOpen="edit"
                      placeholder="想回复点啥..."
                      :toolbarsFlag="true"
                      :toolbars="toolbars"
                      :scrollStyle="true"
                    >
                    </mavon-editor>
                </div>

              </div>


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

  import Userinfo from '@/iview/authorInfo/authorInfo'

  import {Icon} from 'iview'


    export default {
      data(){
        return{
          userInfo:{},   // 评论数据 replies
          authorInfo:{},  //作者信息
          value:"",
          toolbars:{
            italic: true, // 斜体
            superscript: true, // 上角标
            link: true, // 链接
            imagelink: true, // 图片链接
            readmodel: true, // 沉浸式阅读
            trash: true, // 清空
            preview: true, // 预览
            header: true, // 标题
            fullscreen: true, // 全屏编辑
            bold: true, // 粗体
          },

          userreply:"",  // 评论列表中的回复 默认值 @username
          userNameReply:"",
          user_id:"",  //当前登陆用户的id,用来判断进入的帖子是不是自己的,才可以进行编辑操作
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
                  obj.ups.push(youSelf.id)
                }else{
                  obj.ups = obj.ups.filter(item => item !== youSelf.id)
                }
            })

          }else{
            this.$router.push({path:'/login'})
          }
        },

        /**
         * // 收藏 和 取消收藏
         * userInfo.is_collect  true or false
         */
        clickCollect(){

          let {id} = this.userInfo;
          let accesstoken = this.$store.state.usersaveAccess;
          let params = {
            accesstoken,
            id,
          };

          if(this.userInfo['is_collect']){
            params.collect = 'de_collect ';  //动态拼接取消收藏
            this.http.getCollect(params).then(({data}) => {
              this.userInfo['is_collect'] = false;
            })

          }else{
            params.collect = 'collect';  //动态拼接收藏
            this.http.getCollect(params).then(({data}) => {
              this.userInfo['is_collect'] = true;
            })
          }

        },

        /**
         *  点击回复,回复成功需要重新请求当前主题数据列表。 - 封装通用
         */
        clickReply(){
           if(!this.value.trim()) return;

           // 发送回复 post 请求

           let values = this.value;
           let accesstoken = this.$store.state.usersaveAccess;
           let id = this.userInfo.id;
           let params = {
             content:values,
             accesstoken,
             id,
           };

           this.http.setReplies(params).then(({data}) => {

             // 评论成功之后,重新请求当前主题数据
             this.axiosReList();
             this.value = "";

           })
        },

        // 回复时间格式转换
        changeTimes(){
            // 转换this.userInfo.replies 评论数组的时间格式
            let {replies} = this.userInfo;
            let obj = {
              data:replies,
            };
            getDateTimes(obj,'create_at');
            this.userInfo.replies = obj.data;
        },

        // 回复@用户的评论
        toClickReply(obj){
           let userLogin = this.$store.state.userLogin;
           if(userLogin){
             this.userNameReply = obj.id;
             this.userreply = '@' + obj.author['loginname'];
           }
           else{
             this.$router.push({path:'/login'})
           }

        },

        // ISREPLY_NOW 确认回复
        ISREPLY_NOW(obj){

          if(!this.userreply.trim()){
            return;
          }

            let id = this.userInfo.id;
            let reply_id = obj.id;
            let accesstoken = this.$store.state.usersaveAccess;
            let content = this.userreply;
            let params = {
              id,
              accesstoken,
              content,
              reply_id,
            };

            this.http.setReplies(params).then(({data}) => {
               if(data.success){
                 this.axiosReList();
                 this.userreply = "";
                 this.userNameReply = "";
               }
            })

        },

        // 评论成功之后,载入新数据
        axiosReList(){
            //回复成功,载入新数据
            let id = this.$route.params.id;
            let params = {
              id,
              mk:true,
              accesstoken:this.$store.state.usersaveAccess,
            };
            if(id) {
              this.http.getTopicId(params).then(({data}) => {
                getDateTimes(data, 'create_at');
                tabchange(data);
                this.userInfo = data.data;

                // 回复之后请求新的评论数据列表,进行的时间格式转换
                this.changeTimes();
              })
            }
        },

        //用户编辑帖子
        editClick(){
            let {title,content,tab,id} = this.userInfo;
            let accesstoken = this.$store.state.usersaveAccess;

            this.$store.commit('saveEditHander',{
              title,
              content,
              tab,
              id,
              accesstoken
            });

          this.$router.push({path:'/create'})

        }
      },
      components:{
        Userinfo,
        Icon,
      },

      computed:{

      },

      // 初始化
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

              document.title = this.userInfo.title;  //路由标题

              this.user_id = this.$store.state.youSelf.id;  //用户的id

              this.changeTimes();
              return this.userInfo.author['loginname']
            })
           .then((loginname) => {
              this.http.getLoginNames({name:loginname}).then(({data}) => {
                 this.authorInfo = data.data;
              })
           })
            .catch((err) => {

            })
         }else{
            this.$router.push({path:'/index'})
         }
      }
    }
</script>

<style lang="less">
  @import "../../assets/less/details";
  .reply {
    margin-top: 13px;
    width: 100%;
  }
  .reply-header {
    height: 40px;
    line-height: 40px;
    background: #f6f6f6;
    padding-left: 10px;
    color: #444444;
    font-size: 12px;
    position: relative;
  }
  .clickbtn {
    width: 50px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    background: #0088cc;
    color: #fff;
    position: absolute;
    right: 10px;
    top: 6px;
    border-radius: 4px;
    cursor: pointer;
  }
  .v-note-edit{
    height: 250px;
    overflow-y: auto;
    padding-bottom: 60px;
  }

</style>
