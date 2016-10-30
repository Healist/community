<template>
    <nv-header></nv-header>
    <div class="container">
      <zd-crumbs></zd-crumbs>
      <zd-popular></zd-popular>
      <zd-rooter></zd-rooter>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
          "nvHeader":require('../components/header.vue'),
          "zdPopular": require('../components/popular.vue'),
          "zdRooter": require('../components/rooter.vue'),
          "zdCrumbs": require('../components/crumbs.vue')
        }
    }
</script>
