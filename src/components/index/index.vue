<template>
    <div class="index">
      <section class="section">
        <div class="content-left">
          <header class="header-nav">
            <span class="active">全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
            <span>客户端测试</span>
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
              <i>
                {{item.reply_count}} /
              </i>
                {{item.visit_count}}
              </span>
              <span class="topics">{{item.tab}}</span>
              <span class="content-title">{{item.title}}</span>
              <span class="content-time">{{item.last_reply_at}}</span>
            </li>
          </ul>
          <div style="height: 30px; background: blue">分页</div>
        </div>
        <div class="content-right">

        </div>
      </section>
    </div>
</template>

<script>

    import {getDateTimes} from '@/assets/js/getDateTimes'
    import {tabchange} from '@/assets/js/tab'

    export default {
        name: "index",
        data(){
          return {
            datalist:[],
            page:1,
            tab:'all',
            limit:40,
          }
        },
      methods:{
          // 数据请求方法
          getdata(){
            let tab = this.$route.query.tab  || this.tab;
            let params = {
              tab,
              page:this.page,
              limit:this.limit
            };
            this.http.getList(params).then(({data}) => {
              getDateTimes(data);

              // 全部的时候,进行转码
              if(tab === 'all'){
                tabchange(data)
              }
              this.datalist = data.data;
            })
          }
      },
      created(){
        this.getdata();
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
    height: 50px;
    width: 290px;
    background: #ffffff;
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
    margin: 0 3px;
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
  }

  .content-title {
    color: #333333;
  }
  .content-title:hover {
    text-decoration: underline;
  }

  .content-time {
    float: right;
  }
</style>
