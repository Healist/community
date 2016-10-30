<template>
  <div id="editor" type="text/plain" style="width:100%;height:400px;"></div>
</template>

<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        ready: function () {
          let ue = UE.getEditor('editor');
        },
        components:{

        }
    }
</script>

<style scoped>

</style>
