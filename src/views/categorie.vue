<template>
  <nv-header></nv-header>
  <div class="container">
    <zd-crumbs></zd-crumbs>

    <div class="categories">

      <ul class="collection">
        <li class="collection-item avatar row" v-for="item in items">
          <div class="col s10" @click="switchTo($index, item.msg)">
            <img :src="item.url" alt="" class="circle">
            <span class="title">{{item.msg}}</span>
            <p class="content">
              {{item.word}}
            </p>
          </div>
          <div class="col s1 num-box">
            <span class="people-join-num num-bold" title="">2</span><br/>
            <small class="num-label">帖子</small>
          </div>
          <div class="col s1 num-box">
            <span class="people-read-num num-bold" title="">1.5K</span><br/>
            <small class="num-label">浏览</small>
          </div>
          <a href="#!" class="secondary-content"><i class="mdi-action-grade"></i></a>
        </li>
      </ul>
    </div>
    <br/>

    <zd-rooter></zd-rooter>
  </div>
</template>

<script>
    export default{
        data(){
            return{
              items:[
                {msg:'程序猿精英圈',word:'本圈子立志于成为码农精英聚集地,分享干货,共享知识,互相提升水平,探讨技术的乐园',url: 'http://localhost:3030/static/img/speaker2.png'},
                {msg:'互动讨论区',word:'畅所欲言,说你所想,no can,no bb!you can,you up!',url: 'http://localhost:3030/static/img/wechat.png'},
                {msg:'问答专区',word:'每一个大神都是从菜鸟,一个坑一个坑踩过之后,才NB的,带你装B,带你飞!!',url: 'http://localhost:3030/static/img/question.png'},
                {msg:'大神私房菜BLOG',word:'亲们,欢迎撰写博文~~~',url: 'http://localhost:3030/static/img/article.png'},
                {msg:'招聘&求职专区',word:'大学生求职,招聘等请发在这里',url: 'http://localhost:3030/static/img/card.png'},
                {msg:'干货,精华专区',word:'干货精华贴',url: 'http://localhost:3030/static/img/zan.png'}
              ]
            }
        },
        components:{
          "nvHeader":require('../components/header.vue'),
          "zdCategory": require('../components/category.vue'),
          "zdRooter": require('../components/rooter.vue'),
          "zdCrumbs": require('../components/crumbs.vue')
        },
        methods: {
          switchTo: function (index, title) {
            if(index == 0) {
              this.$router.go({name: 'cate',params: {categoryTitle: title}});
            } else if(index == 1){
              this.$router.go({name: 'cate',params: {categoryTitle: title}});
            } else if(index == 2){
              this.$router.go({name: 'cate',params: {categoryTitle: title}});
            } else if(index == 3){
              this.$router.go({name: 'cate',params: {categoryTitle: title}});
            } else if(index == 4){
              this.$router.go({name: 'cate',params: {categoryTitle: title}});
            } else if(index == 5){
              this.$router.go({name: 'cate',params: {categoryTitle: title}});
            }
          }
        }
    }
</script>

<style scoped>
  .category>ul {
    list-style-type: none;
    padding: 0;
  }
  .category>ul>li {
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 53px;
    list-style: none;
    border-bottom: 1px solid #f0f4c3;
  }
  .category>ul li:last-child {
    border-bottom: 0;
  }
  .collection-item div:first-child {
    cursor: pointer;
  }
  .container .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .num-box{
    padding-top: 0.8rem !important;
    padding-bottom: 0.8rem !important;
    font-size: 16px;
  }
  .num-bold{
    font-weight: bold;
  }
  .num-label {
    color: #607d8b;
  }
  .title {
    color: #337ab7;
    font-size: 18px;
    word-wrap: break-word;
  }
  .content {
    color: #777;
    font-weight: normal;
    font-size: 0.8rem;
    line-height: 2.5rem;
  }
</style>
