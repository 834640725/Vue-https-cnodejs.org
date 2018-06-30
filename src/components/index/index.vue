<template>
    <div class="index">
      <section class="section">
        <div class="content-left">
          <header class="header-nav">
            <!--<span class="active">全部</span>-->
            <!--<span>精华</span>-->
            <!--<span>分享</span>-->
            <!--<span>问答</span>-->
            <!--<span>招聘</span>-->
            <!--<span>客户端测试</span>-->
            <span
              v-for="item in navlist"
              :key="item.id"
              :class="item.url === tab ? 'active' : ''"
              @click="clickHander(item)"
            >
              {{item.name}}
            </span>
          </header>
          <!--数据列表-->
          <ul class="content-warpper">
            <!--<li>-->
              <!--<img src="../../assets/images/icon1.png" alt="" class="user-image">-->
              <!--<span class="number">-->
                <!--<i>242 / </i>14053-->
              <!--</span>-->
              <!--<span class="topics">置顶</span>-->
              <!--<span class="content-title">-->
                <!--【NODE PARAT】【上海】【已结束】 PPT已上传-->
              <!--</span>-->
              <!--<span class="content-time">1 小时前</span>-->
            <!--</li>-->
            <li v-for="item,index in datalist" :key="Math.random()">
              <img :src="item.author['avatar_url']" alt="" class="user-image" @click.prevent="goUserClick(item)">
              <span class="number">
              <i>{{item.reply_count}}/</i>{{item.visit_count}}
              </span>
              <span class="topics" v-if="tab === 'all' && item.tab">{{item.tab}}</span>
              <span class="content-title" @click="clickDetails(item)" :title="item.title">{{item.title}}</span>
              <span class="content-time">{{item.last_reply_at}}</span>
            </li>
          </ul>

          <Page :total="6000" class="pages" :page-size="20" :current="page" @on-change="changePages"></Page>
        </div>
        <div class="content-right">
          <header class="header-content" v-if="!isLogin">
            <p>CNode: Node.js专业中文社区</p>
            <p class="login" @click="clickLogins">通过 Access Token 登陆</p>
          </header>

          <authorComponent :authorInfo="authorInfo" v-if="isLogin">
            <div class="r-title">个人信息</div>
          </authorComponent>

        </div>
      </section>
    </div>
</template>

<script>

    import {getDateTimes} from '@/assets/js/getDateTimes'
    import {tabchange} from '@/assets/js/tab'
    import indexnavList from '@/assets/js/index-navlist'  //导航列表

    import authorComponent from '@/iview/authorInfo/authorInfo'

    import { Page } from 'iview'
    import Cookies from 'js-cookie'



    export default {
        name: "index",
        data(){
          return {
            navlist:indexnavList,
            datalist:[],
            page:1,
            tab:'all',
            limit:40,
            authorInfo:{},  //当前用户登陆的数据
            userallData:{}, //当前用户的详细信息
          }
        },

      components:{
        Page,
        authorComponent,
      },

      methods:{
          // 数据请求方法
          getdata(){
            // 配置刷新后导航停留原来的地方
            let tab = this.$route.query.tab  || this.tab;
            let page = this.$route.query.page*1 || 1;
            this.tab = tab;
            this.page = page;

            let params = {
              tab,
              page:this.page,
              limit:this.limit
            };
            this.http.getList(params).then(({data}) => {
              getDateTimes(data,'last_reply_at');

              // 全部的时候,进行转码
              if(tab === 'all'){
                tabchange(data)
              }
              this.datalist = data.data;
            })
          },

        // 通过loginname 请求数据获取当前登陆用户的积分
        getUserinfo(name){
          this.http.getLoginNames({name}).then(({data}) => {
             this.userallData = data.data;
             this.authorInfo.score = this.userallData.score;  // 同步用户的积分
          })
        },

        // 编程式导航
        clickHander(obj){
            this.$router.push({path:'index',query:{tab:obj.url}})
        },

        //切换分页  tab 和 query共存,就把之前的对象赋值到当前的query对象
        changePages(page){
            this.page = page;
            let query = this.$route.query;
            this.$router.push({path:'index',query:{...query,page:this.page}});
            this.getdata();
        },

        // 进入主题路由
        clickDetails(obj){
           let {id,tab} = obj;
           this.$router.push({path:`topic/${id}`})
        },

        // 进入登陆
        clickLogins(){
            this.$router.push({path:'/login'})
        },

        // 首页列表,点击头像查看用户信息
        goUserClick(obj){
           let loginname = obj.author['loginname'];
           this.$router.push({path:`/user/${loginname}`})
        }
      },
      computed:{
        isLogin(){
          return this.$store.state.userLogin;
        }
      },

      created(){
          // 判断是否登陆
        let name = Cookies.get('name');
        if(name){
          name = JSON.parse(name);

          if(name.loginname){
            this.$route.meta.login = true;
            this.authorInfo = name;
            this.getUserinfo(name.loginname)  //用户积分
          }else{
            this.$route.meta.login = false;
          }
        }

        this.getdata();
      },
      watch:{
          $route:function (newRouter) {
            this.getdata();
          }
      },
    }
</script>

<style lang="less">
  @import "../../assets/less/index/index";
</style>
