<template>
    <div>
      <slot></slot>
        <div class="user_card">
          <div class="user-image">
            <a href="#" v-if="userinfo.author">
              <img :src="userinfo.author['avatar_url']" alt="">
              <span>{{userinfo.author['loginname']}}</span>
            </a>
            <p class="big">积分: {{userScore}}</p>
            <p>此用户没有签名...</p>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"my-authorinfo",
        props:['score','userInfo'],
        data(){
          return {
            userinfo:this.userInfo,
            userScore:this.score,
          }
        },
      created(){
        console.log(this.userinfo)
      }
    }
</script>

<style scoped>

</style>
