<template>
    <div class="clearfix row">
      <a @click="openEditor" class="waves-effect waves-light btn blue darken-4 col s2 label" style="left:1rem">发布新主题</a>
      <span class="righ col s4 offset-s6 hide">
        <a class="waves-effect waves-light btn light-green label" style="margin-left:4rem"><i class="mdi-file-cloud left"></i>关注</a>
        <div class="btn-group form-control2">
            <select class="label">
              <option value="alpha">从新到旧</option>
              <option value="count">从旧到新</option>
              <option value="date">最多回复</option>
            </select>
          </div>
      </span>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        props: ['showEditor'],
        components:{

        },
        methods: {
          openEditor: function () {
            this.showEditor = true;
          }
        }
    }
</script>

<style scoped>
  select {
    text-transform: none;
    color: inherit;
    font: inherit;
    margin: 0;
    display: block !important;
  }
  .form-control2{
    padding-left: 15px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
  }
  .btn-group {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .label {
    height:2.4rem !important;
  }
</style>
