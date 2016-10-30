<template>
  <div class="alert alert-danger">
    <strong>{{ accountName }}未找到</strong>
    <p>您遇到了不存在的页面。返回
      <a v-link={name:'home'}>首页</a>
      。</p>
  </div>
</template>
<style scoped>
  .alert-danger {
    background-color: #f2dede;
    border-color: #ebccd1;
    color: #a94442;
  }
  .alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 0;
  }
  .alert>p, .alert>ul {
    margin-bottom: 0;
  }
</style>
<script>
    export default{
        data(){
            return{
              accountName: this.$route.params.loginName,  //当前浏览的用户
            }
        },
        components:{
        }
    }
</script>
