<template>
  <div id="app">
      <header class="header">
        <div class="header-content">
          <img src="./assets/images/cnodejs_light.svg" alt="" class="header-logo" @click="clickHander">
          <ul class="header-nav">
            <li @click="clickHander">首页</li>
            <li>关于</li>
            <li @click="clickLogin">{{isLogin}}</li>
          </ul>
        </div>
      </header>
      <router-view></router-view>
      <footer class="footer">
         <section class="footer-content">
           <a href="https://github.com/qiqingfu" target="_blank">github | 源码地址</a>
           <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
           <p>api数据接口由 <a href="https://cnodejs.org/api" target="_blank">https://cnodejs.org/api</a> 提供</p>
           <p>github地址: <a href="https://github.com/qiqingfu" target="_blank"> https://github.com/qiqingfu</a>
           欢迎各位朋友一起交流学习进步。
           </p>
         </section>
      </footer>
  </div>
</template>

<script>

  import Cookies from 'js-cookie'

export default {
  name: 'App',
  data(){
    return {

    }
  },
  methods:{
    clickHander(){
      this.$router.push({path:'/index', query:{tab:'all'}})
    },
    // 登陆 and 退出
    clickLogin(){
      if(this.$store.state.userLogin){
        // 退出
        Cookies.remove('name');
        this.$store.commit('loginSuccess',false)

      }else{
        // 登陆
        this.$router.push({path:'/login'})
      }
    }
  },
  computed:{
    isLogin(){
      return this.$store.state.userLogin ? "退出" : "登陆"
    }
  },
  created(){
    let name = Cookies.get('name');
    if(name){
      name = JSON.parse(name)
      if(name.loginname){
        this.$route.meta.login = true;
      }else{
        this.$route.meta.login = false;
      }
    }


    // 页面刷新,获取本地cookie,同步route的meta。再同步vuex状态,供其他组件共享
    let routeisLogin = this.$route.meta.login;
    this.$store.commit('loginSuccess',routeisLogin)

  },
}
</script>

<style scoped>
  .header {
    height: 50px;
    background: #444444;
    cursor: pointer;
  }
  .header-content {
    height: 50px;
    margin: 0 auto;
    max-width: 1400px;
  }
  .header-logo {
    width: 122px;
    float: left;
    height: 50px;
  }
  .header-nav {
    float: right;
  }
  .header-nav li {
    float: left;
    line-height: 50px;
    color: #cccccc;
    margin: 0 17px;
  }
  .header-nav li:hover {
    color: #fff;
  }

  .footer {
    height: 190px;
  }
  .footer-content {
    max-width: 1400px;
    height: 120px;
    margin: 0 auto;
    position: relative;
    padding: 20px 0;
  }
  .footer-content>p {
    line-height: 35px;
    color: #ababab;
  }
</style>
