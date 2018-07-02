<template>
  <div class="content">
      <div class="content-btn" @click="clickPublish">
        发布话题
      </div>
  </div>
</template>

<script>
    export default {
        name: "release",
        data(){
          return{

          }
        },
      methods:{
        clickPublish(){
          this.$emit('onPublish')
        }
      }
    }
</script>

<style lang="less">
  @import "../../assets/less/release/release";
</style>
