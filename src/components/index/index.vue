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
              <img :src="item.author['avatar_url']" alt="" class="user-image">
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
          <header class="header-content">
            <p>CNode: Node.js专业中文社区</p>
            <p class="login">通过 Access Token 登陆</p>
          </header>
        </div>
      </section>
    </div>
</template>

<script>

    import {getDateTimes} from '@/assets/js/getDateTimes'
    import {tabchange} from '@/assets/js/tab'
    import indexnavList from '@/assets/js/index-navlist'  //导航列表

    import { Page } from 'iview'

    export default {
        name: "index",
        data(){
          return {
            navlist:indexnavList,
            datalist:[],
            page:1,
            tab:'all',
            limit:40,
          }
        },
      components:{
        Page,
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
        }
      },
      created(){
        this.getdata();
      },
      watch:{
          $route:function (newRouter) {
            this.getdata();
          }
      }
    }
</script>

<style scoped>
  .index {
    background: #e1e1e1;
    padding: 20px 0;
  }
  .section {
    max-width: 1400px;
    margin: 0 auto;
    background: #e1e1e1;
    position: relative;
  }
  .content-left {
    margin-right: 300px;
    background: #ffffff;
  }
  .content-right {
    position: absolute;
    right: 0;
    top: 0;
    width: 290px;
    background: #ffffff;
    border-radius: 4px;
  }

  .header-nav {
    height: 40px;
    line-height: 40px;
    padding: 0 8px;
    cursor: pointer;
    background: #f6f6f6;
  }
  .header-nav>span {
    padding: 6px 4px;
    color: #80bd01;
    margin: 0 12px;
    font-size: 12px;
    border-radius: 4px;
    text-align: center;
  }
  .header-nav>span:hover {
    color: #555555;
  }
  .header-nav>span.active {
    background: #80bd01;
    color: #ffffff;
  }

  .content-warpper>li {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    border-bottom: solid 1px #f0f0f0;
    cursor: pointer;
    font-size: 15px;
  }
  .content-warpper>li:last-child {
    border-bottom: none;
  }

  .content-warpper>li:hover {
    background: #f5f5f5;
  }

  .user-image {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    vertical-align: middle;
  }

  .content-warpper .number {
    color: #b4b4b4;
    margin: 0 4px 0 8px;
    cursor: auto;
  }
  .content-warpper .number>i {
    font-style: normal;
    color: #000;
  }
  .content-warpper .topics {
    padding: 4px;
    background: #e5e5e5;
    border-radius: 4px;
    text-align: center;
    color: #999999;
    font-size: 12px;
    margin-right: 13px;
    cursor: auto;
  }

  .content-title {
    color: #333333;
  }
  .content-title:hover {
    text-decoration: underline;
  }

  .content-time {
    float: right;
    font-size: 12px;
  }
  .pages {
    padding: 10px;
  }

  /*右侧*/
  .header-content {
    height: 116px;
    padding: 18px 10px 10px;
    font-size: 11px;
  }
  .header-content .login {
    display: inline-block;
    padding: 11px 9px;
    text-align: center;
    color: #ffffff;
    font-size: 12px;
    background: #5bc0de;
    margin-top: 14px;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
