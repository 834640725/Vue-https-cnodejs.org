<template>
<div class="login-content">
  <section class="login-section clearfix">
    <div class="login-left">
      <header class="left-header">
        <a href="#">主页</a> / 登陆
      </header>
      <div class="left-warp">
        <p class="access">
          <span>Access Token账号</span>
          <input type="text">
        </p>
        <div class="bot">
          <span class="it-login">登陆</span>
          <a href="#" class="target">忘记账号了?</a>
        </div>
      </div>
    </div>
    <div class="login-right">
      <header class="r-header">
        关于
      </header>
      <p class="r-title">CNode: Node.js专业中文社区</p>
      <ul class="r-list">
        <li>你可以通过 Access Token 进行登陆浏览</li>
        <li>如果没有账号,请前往 <a href="#" style="color: #778087">注册</a></li>
        <li>
          个人github地址:
          <a href="https://github.com/qiqingfu" target="_blank">@qiqingfu</a>
        </li>
        <li>印象笔记项目地址: <a href="https://github.com/qiqingfu/vue-Impression--notes" target="_blank">印象笔记</a></li>
        <li>拉钩网移动端项目: <a href="https://github.com/qiqingfu/lagou" target="_blank">拉钩网</a></li>
        <li>微信小程序项目</li>
      </ul>
    </div>
  </section>
</div>
</template>

<script>
    export default {
        name: "login",
        
    }
</script>

<style scoped>
.login-content {
  background: #e1e1e1;
  padding: 14px 0 200px;
}
.login-section {
  max-width: 1400px;
  height: 500px;
  margin: 0 auto;
  position: relative;
  background: #e1e1e1;
}

.login-left {
  background: #ffffff;
  margin-right: 305px;
}

.left-header {
  height: 40px;
  background: #f6f6f6;
  line-height: 40px;
  padding-left: 10px;
}
.left-header>a {
  color: #80bd01;
}
.left-warp {
  padding: 50px 130px 300px;
}
.access>p{
   font-size: 12px;
   color: #333333;
}
  .access>input {
    height: 28px;
    width: 282px;
    border-radius: 4px;
    outline: none;
    border: solid 1px #cccccc;
    padding-left: 4px;
    margin-left: 10px;
  }

  .it-login {
    display: inline-block;
    width: 150px;
    height: 34px;
    line-height: 34px;
    background: #5bc0de;
    text-align: center;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
  }

  .target {
    color: #778087;
    margin-left: 19px;
  }

  .bot {
    margin-top: 20px;
    text-align: left;
    padding-left: 110px;
  }

  .login-right {
    width: 290px;

    position: absolute;
    right: 0;
    top: 0;
    background: #ffffff;
    border-radius: 6px;
  }

  .r-header {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    background: #f6f6f6;
    color: #333333;
  }

  .r-list {
    padding: 16px 14px;
  }
  .r-list>li {
      line-height: 28px;
  }
  .r-title {
    line-height: 40px;
    font-size: 16px;
    padding-left: 12px;
  }
</style>
