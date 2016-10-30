<template>
    <div class="popular">

        <ul class="nav nav-pills">
          <li><a v-link="{name: 'daily', params:{moudle: 'popular'}, append: true}">日</a></li>
          <li><a v-link="{name: 'weekly', params:{moudle: 'popular'}, append: true}">周</a></li>
          <li><a v-link="{name: 'monthly', params:{moudle: 'popular'}, append: true}">月</a></li>
        </ul>

        <zd-category></zd-category>

    </div>
    <br/>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        components:{
            'zdCategory':require('../components/category.vue'),
            'zdCrumbs':require('../components/crumbs.vue')
        }
    }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul{
    margin-top: 0;
    margin-bottom: 10px;
  }
  .nav {
    min-height: 50px;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-left: 0;
    list-style: none;
  }
  .nav-pills>li {
    float: left;
  }
  .nav>li {
    position: relative;
    display: block;
  }
  .nav-pills>li>a {
    border-radius: 0;
  }
  .nav>li>a {
    position: relative;
    display: block;
    padding: 10px 15px;
  }
  .nav-pills>li:hover {
    background-color: #c5c4ab;
  }

  .nav-pills>li:hover a{
    color: #fff;
  }
</style>
