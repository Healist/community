<template>
    <nv-header></nv-header>
    <div class="container">
        <zd-popular></zd-popular>
        <zd-rooter></zd-rooter>
    </div>
</template>

<script>
    import store from '../store/store'
    //noinspection JSUnresolvedFunction
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        store: store,
        components: {
            "nvHeader":require('../components/header.vue'),
            "zdPopular": require('../components/popular.vue'),
            "zdRooter": require('../components/rooter.vue')
        },
        create() {
          this.initData();
        }
    }
</script>

<style>
  body {
    margin: 0;
    padding:0;
    font-family: "Roboto","Helvetica Neue",Helvetica,Arial,sans-serif;
  }
</style>
