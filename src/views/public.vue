<template>
  <zd-editor></zd-editor>
</template>

<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
          "zdEditor":require('../components/editor.vue')
        }
    }
</script>

<style scoped>

</style>
