<template>
  <div class="user-content">
    <section class="section clearfix">

      <div class="user-left">

        <div class="header-content">
          <header class="nav">
            <a href="#">首页</a> /
            <div class="user-big">
              <img src="../../../assets/images/icon1.png" alt="">
              <span>s11563123</span>
              <p class="big">5 积分</p>
              <a href="#">@wpengw</a>
              <p>注册时间 4小时前</p>
            </div>
          </header>
        </div>

        <!--创建的话题列表-->
        <div class="create-gambit">
          <div class="bit-header">最近创建的话题</div>
          <ul class="list">
            <li>
              <img src="../../../assets/images/icon1.png" alt="" class="img">
              <span>0/97</span>
              <a href="#">async源码之series</a>
            </li>
          </ul>
        </div>

        <!--参与的话题-->
        <div class="create-gambit joinSubject">
          <div class="bit-header">最近参与的话题</div>
          <ul class="list">
            <li>
              <img src="../../../assets/images/icon1.png" alt="" class="img">
              <span>0/97</span>
              <a href="#">async源码之series</a>
            </li>
          </ul>
          <p class="subject" v-if="false">无话题</p>
        </div>

      </div>
      <div class="user-right">

      </div>
    </section>
    <div style="height: 300px;"></div>
  </div>
</template>

<script>
    export default {
        name: "user",
        data(){
          return {
            
          }
        }
    }
</script>

<style lang="less">
  @import "../../../assets/less/user/user";
</style>
