<template>
    <div>
      <slot></slot>
        <div class="user_card">
          <div class="user-image">
            <a href="#" @click.prevent="clickDetails">
              <img :src="authorInfo.avatar_url" alt="">
              <span>{{authorInfo.loginname}}</span>
            </a>
            <p class="big">积分: {{authorInfo.score}}</p>
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

          }
        },
      methods:{
          // 预想在details组件中 点击用户头像 查看用户的详细信息
        clickDetails(){
           let {loginname} = this.authorInfo;
           this.$router.push({path:`/user/${loginname}`})
        }
      },
      watch:{

      }
    }
</script>
