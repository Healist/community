<template>
  <zd-editor :show-editor.sync="showEditor"></zd-editor>
  <nv-header></nv-header>
  <div class="container">
    <zd-crumbs></zd-crumbs>
    <zd-public :show-editor.sync="showEditor"></zd-public>
    <div class="recent">

      <zd-category></zd-category>

    </div>
    <br/>

    <zd-rooter></zd-rooter>
  </div>
</template>

<script>
    export default{
        data(){
            return{
                showEditor:false
            }
        },
        components:{
          "nvHeader":require('../components/header.vue'),
          "zdCategory": require('../components/category.vue'),
          "zdRooter": require('../components/rooter.vue'),
          "zdCrumbs": require('../components/crumbs.vue'),
          "zdPublic": require('../components/public.vue'),
          "zdEditor": require('../components/editor.vue')
        }
    }
</script>

<style scoped>

</style>
