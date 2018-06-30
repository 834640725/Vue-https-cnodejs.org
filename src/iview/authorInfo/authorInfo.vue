<template>
    <div>
      <slot></slot>
        <div class="user_card">
          <div class="user-image">
            <a href="#" @click.prevent="clickDetails">
              <img :src="AuthorInfo.avatar_url" alt="">
              <span>{{AuthorInfo.loginname}}</span>
            </a>
            <p class="big">积分: {{AuthorInfo.score}}</p>
            <p><i>*这家伙很懒,什么都没有留下...*</i></p>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"my-authorinfo",
        props:['authorInfo'],
        data(){
          return {
            AuthorInfo:this.authorInfo,
          }
        },
      methods:{
          // 预想在details组件中 点击用户头像 查看用户的详细信息
        clickDetails(){
           let {loginname} = this.AuthorInfo;
           this.$router.push({path:`/user/${loginname}`})
        }
      },
      created(){

      }
    }
</script>
