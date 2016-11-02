<template>
  <div class="category">
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
  </div>
</template>

<script>
    import { actions } from '../store/store';

    export default{
        data(){
            return{
              items: "",
              update: "", //每次更新的数据
              filterKey: decodeURI(this.$route.params.categoryTitle),
              page: 1,
              limit: 10
            }
        },
        vuex: {
          actions: actions,
          getters: {
            loginName: ({ user }) => user.loginName,
            lineStatus: ({ lineStatus }) => lineStatus,
            isUpdateTitle: ({ isUpdateTitle }) => isUpdateTitle
          }
        },
        watch: {
          'isUpdateTitle': function (val, oldVal) {
            let flag = false;
            if(val == true) {
              //更新数据
              this.$http.get(
                'http://123.207.167.206:3000/users/articles/1/2',
                {},
                {}).then(function (response) {
                //成功回调
                if(response.ok) {
                  console.log("更新数据成功");
                  let key = this.filterKey;
                  if(key == null || key == "undefined") {
                    key = "";
                  }
                  this.items = response.data.body.filter(function (item) {
                    return item.type.includes(key);
                  });
                  flag = true;
                }
              }, function (response) {
                //回调失败
                Materialize.toast('更新数据失败', 3000);
              });
              if(flag) {
                this.setUpdateTitle(false);
              }
            }
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
            'http://123.207.167.206:3000/users/articles/1/' + this.limit,
            {},
            {}).then(function (response) {
            //成功回调
            if(response.ok) {
              console.log("获取数据成功");
              let key = this.filterKey;
              if(key == null || key == "undefined") {
                key = "";
              }
              this.items = response.data.body.filter(function (item) {
                return item.type.includes(key);
              });
            }
          }, function (response) {
            //回调失败
            Materialize.toast('初始化获取数据失败', 3000);
          })
        },
        ready: function(){
          var range = 50;             //距下边界长度/单位px
          var maxnum = 20;            //设置加载最多次数
          var num = 1;
          var totalheight = 0;

          $(window).scroll(()=>{
            var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
            totalheight = parseFloat($(window).height()) + parseFloat(srollPos);

            if(($(document).height()-range) <= totalheight  && num != maxnum) {
              //获取更新的数据
              this.page = this.page + 1;
              this.$http.get(
                'http://123.207.167.206:3000/users/articles/' + this.page + '/' + this.limit,
                {},
                {}).then(function (response) {
                //成功回调
                if(response.ok) {
                  console.log("获取数据成功");
                  let key = this.filterKey;
                  if(key == null || key == "undefined") {
                    key = "";
                  }
                  this.update = response.data.body.filter(function (item) {
                    return item.type.includes(key);
                  });
                  this.items = this.items.concat(this.update);
                }
              }, function (response) {
                //回调失败
                Materialize.toast('初始化获取数据失败', 3000);
              });
              //添加次数
              num++;
            }
          });
    },
        methods: {
          toTopic: function (title) {
              this.$router.go({name: 'topic', params: {title: title}});
            //增加浏览量
            this.$http.get(
              'http://123.207.167.206:3000/users/visitcount/add/' + title,
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
