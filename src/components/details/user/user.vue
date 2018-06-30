<template>
  <div class="user-content">
    <section class="section clearfix">

      <div class="user-left">

        <div class="header-content">
          <header class="nav">
            <a href="#" @click.prevent="clickHander">首页</a> /
            <div class="user-big">
              <img :src="userSuccess.avatar_url" alt="">
              <span>{{userSuccess.githubUsername}}</span>
              <p class="big">{{userSuccess.score}} 积分</p>
              <a :href="userGithub" target="_blank">@{{userSuccess.githubUsername}}</a>
              <p>注册时间 {{userSuccess.create_at}}</p>
            </div>
          </header>
        </div>

        <!--创建的话题列表-->
        <div class="create-gambit">
          <div class="bit-header">最近创建的话题</div>
          <ul class="list">
            <li v-for="item in userSuccess.recent_topics">
              <img :src="userSuccess.avatar_url" alt="" class="img">
              <span>12/97</span>
              <a href="#" @click.prevent>{{item.title}}</a>
            </li>
          </ul>
        </div>

        <!--参与的话题-->
        <div class="create-gambit joinSubject">
          <div class="bit-header">最近参与的话题</div>
          <!--<div class="bit-header">{{hasRecent}}</div>-->
          <ul class="list" v-if="length">
            <li v-for="item in userSuccess.recent_replies">
              <img :src="item.author['avatar_url']" alt="" class="img" :data-username="item.author['loginname']">
              <span>2/43</span>
              <a href="#" @click.prevent>{{item.title}}</a>
            </li>
          </ul>
          <p class="subject" v-if="!length">无话题</p>
        </div>

      </div>
      <div class="user-right">
        <authorInfo :authorInfo="userSuccess" v-if="userSuccess.githubUsername">
          <div class="r-title">个人信息</div>
        </authorInfo>
      </div>
    </section>
    <div style="height: 300px;"></div>
  </div>
</template>

<script>
    import {getDateTimes} from '@/assets/js/getDateTimes'
    import authorInfo from '@/iview/authorInfo/authorInfo'


    export default {
        name: "user",
        data(){
          return {
            userSuccess:{},   //用户信息
            length:'',
          }
        },

      methods:{
        clickHander(){
          this.$router.push({path:'/index', query:{tab:'all'}})
        }
      },

      components:{
        authorInfo,
      },
      computed:{
        userGithub(){
          return `https://github.com/${this.userSuccess.githubUsername}`
        },
      },
      created(){
        let userName = this.$route.params.name;
        this.http.getLoginNames({name:userName}).then(({data}) => {
            getDateTimes(data,'create_at');  //转注册时间格式
            this.userSuccess = data.data;
            console.log(this.userSuccess);
            return this.userSuccess;

        }).then((data) => {
            this.length = data.recent_replies.length;
        })
      }
    }
</script>

<style lang="less">
  @import "../../../assets/less/user/user";
</style>
