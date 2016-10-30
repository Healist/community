<template>
  <nv-header></nv-header>
  <div class="container">
    <zd-crumbs></zd-crumbs>

    <ul class="collection">
      <li class="collection-item avatar row" v-for="item in items">
        <div class="col s10">
          <!--<img src="../assets/3.png" alt="" class="circle" style="width:52px;height:52px;">-->
          <div class="user-icon">{{ item.author_name | firstLetter }}</div>
          <span class="title lt" @click="toTopic(item.title)">{{item.title}}</span>
          <p class="lt">
            <small>
              <a v-link="{name: 'cate', params: {categoryTitle: item.type}}"> {{ item.type }} </a>
            </small>
            <span>•</span>
            <small v-show="item.tab != null && item.tab != ''">
              <span class="tag"> {{ item.tab }} </span>
            </small>
            <span v-show="item.tab != null && item.tab != ''">•</span>
            <small>
              <span class="timeago"> {{ item.create_at | createTime }} </span>
            </small>
          </p>
        </div>
        <div class="col s1 num-box">
          <span class="people-join-num num-bold" title="">{{ item.collect_count }}</span><br/>
          <small class="num-label">参与</small>
        </div>
        <div class="col s1 num-box">
          <span class="people-read-num num-bold" title="">{{ item.visit_count }}</span><br/>
          <small class="num-label">浏览</small>
        </div>
        <a href="#!" class="secondary-content"><i class="mdi-action-grade"></i></a>
      </li>
    </ul>

    <zd-rooter></zd-rooter>
  </div>
</template>

<script>
    export default{
        data(){
            return{
              tagName: this.$route.params.tagName,
              items: ""
            }
        },
        filters: {
          firstLetter(username) {
            return username.substr(0, 1);
          },
          createTime(date) {
            if(!date) {
              return;
            }
            let now = Date.now();
            now = new Date(now);
            if(typeof date === 'string') {
              date = new Date(date);
            }
            let year = now.getFullYear() - date.getFullYear();
            let month = now.getMonth() - date.getMonth();
            let days = now.getDate() - date.getDate();
            let hours = now.getHours() - date.getHours();
            if( year>0 ) {
              return year + "年之前";
            } else if (month > 0) {
              return month + "月之前";
            } else if(days > 0) {
              return days + "天之前";
            } else if(hours>0) {
              return hours + "小时之前";
            } else {
              return "刚刚";
            }
          }
        },
        created: function () {
          this.$http.get(
            'http://localhost:3000/users/tags/' + this.tagName,
            {},
            {
              'headers': {
                "X-Requested-With": "XMLHttpRequest"
              },
              emulateJSON: true,
              crossOrigin: true
            }).then(function (response) {
            //成功回调
            if(response.ok) {
              this.items = response.data.message;
            }
          }, function (response) {
            //回调失败
            Materialize.toast('获取标签失败', 3000);
          });
        },
        methods: {
          toTopic: function (title) {
            this.$router.go({name: 'topic', params: {title: title}});
            //增加浏览量
            this.$http.get(
              'http://localhost:3000/users/visitcount/add/' + title,
              {},
              {}
            ).then(function (response) {
              if(response.ok) {
                //成功增加访问量
              } else {
                console.log("增加访问量失败。。");
              }
            }, function (response) {
              console.log("增加访问量失败。。");
            });
          }
        },
        components:{
          "nvHeader":require('../components/header.vue'),
          "zdRooter": require('../components/rooter.vue'),
          "zdCrumbs": require('../components/crumbs.vue')
        }
    }
</script>

<style scoped>
  .category .topic-list {
    margin-top: 10px;
  }
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
    word-wrap: break-word;
    font-size: 20px !important;
    font-weight: bold;
    line-height: 2rem;
    cursor: pointer;
  }
  .user-icon {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    line-height: 62px;
    font-size: 3rem;
    display: inline-block;
    text-align: center;
    color: #eee;
    font-weight: normal;
    background-color: #f44336;
    position: absolute;
    left:15px;
    vertical-align: middle;
    overflow: hidden;
  }
  .lt {
    margin-left: 1rem !important;
  }
  .tag {
    text-transform: uppercase;
    font-size: 10px;
    background: #f5f5f5;
    padding: 5px;
    white-space: nowrap;
    color: rgb(29, 241, 114);
  }
</style>
