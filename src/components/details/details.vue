<template>
    <div>
      <h2>主题详情</h2>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          userInfo:{},
        }
      },
      created(){
        let author_id = this.$store.state.detailsId;
      }
    }
</script>

<style scoped>

</style>
