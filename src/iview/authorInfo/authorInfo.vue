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
            <p><i>*这家伙很懒,什么都没有留下...*</i></p>
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

      }
    }
</script>
