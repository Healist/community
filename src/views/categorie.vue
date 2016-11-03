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
            <span class="people-join-num num-bold" title="" v-if="item.msg == '程序猿精英圈'">{{ programCount }}</span>
            <span class="people-join-num num-bold" title="" v-if="item.msg == '互动讨论区'">{{ talkCount }}</span>
            <span class="people-join-num num-bold" title="" v-if="item.msg == '问答专区'">{{ questionCount }}</span>
            <span class="people-join-num num-bold" title="" v-if="item.msg == '大神私房菜BLOG'">{{ blogCount }}</span>
            <span class="people-join-num num-bold" title="" v-if="item.msg == '招聘&求职专区'">{{ jobCount }}</span>
            <span class="people-join-num num-bold" title="" v-if="item.msg == '干货,精华专区'">{{ creamCount }}</span>
            <br/>

            <small class="num-label">帖子</small>
          </div>
          <div class="col s1 num-box">
            <span class="people-read-num num-bold" title="" v-if="item.msg == '程序猿精英圈'">{{ programVisitCount }}</span>
            <span class="people-read-num num-bold" title="" v-if="item.msg == '互动讨论区'">{{ talkVisitCount }}</span>
            <span class="people-read-num num-bold" title="" v-if="item.msg == '问答专区'">{{ questionVisitCount }}</span>
            <span class="people-read-num num-bold" title="" v-if="item.msg == '大神私房菜BLOG'">{{ blogVisitCount }}</span>
            <span class="people-read-num num-bold" title="" v-if="item.msg == '招聘&求职专区'">{{ jobVisitCount }}</span>
            <span class="people-read-num num-bold" title="" v-if="item.msg == '干货,精华专区'">{{ creamVisitCount }}</span>
            <br/>

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
              ],
              programCount: 0,
              programVisitCount: 0,
              talkCount: 0,
              talkVisitCount: 0,
              questionCount: 0,
              questionVisitCount:0,
              blogCount: 0,
              blogVisitCount: 0,
              jobCount: 0,
              jobVisitCount: 0,
              creamCount: 0,
              creamVisitCount: 0,
              result: ""
            }
        },
        created: function () {
          this.$http.get(
            'http://localhost:3000/users/category',
            {},
            {}
          ).then(function (response) {
            if(response.ok) {
              this.result = response.data.message;
              this.result.forEach(function (item) {
                if(item.category == "程序猿精英圈") {
                  this.programCount = item.counts;
                  this.programVisitCount = item.visit_count;
                } else if (item.category == "互动讨论区") {
                  this.talkCount = item.counts;
                  this.talkVisitCount = item.visit_count;
                } else if (item.category == "问答专区") {
                  this.questionCount = item.counts;
                  this.questionVisitCount = item.visit_count;
                } else if (item.category == "大神私房菜BLOG") {
                  this.blogCount = item.counts;
                  this.blogVisitCount = item.visit_count;
                } else if (item.category == "招聘&求职专区") {
                  this.jobCount = item.counts;
                  this.jobVisitCount = item.visit_count;
                } else if (item.category == "干货,精华专区") {
                  this.creamCount = item.counts;
                  this.creamVisitCount = item.visit_count;
                }
              });
            } else {
              console.log("获取category失败");
            }
          }, function (response) {
            console.log("获取category失败");
          });
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
