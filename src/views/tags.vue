<template>
  <nv-header></nv-header>
  <div class="container">
    <zd-crumbs></zd-crumbs>

    <zd-searchtag></zd-searchtag>

    <zd-rooter></zd-rooter>
  </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                tags: ""
            }
        },
        components:{
          "nvHeader":require('../components/header.vue'),
          "zdSearchtag": require('../components/searchtag.vue'),
          "zdRooter": require('../components/rooter.vue'),
          "zdCrumbs": require('../components/crumbs.vue')
        }
    }
</script>
