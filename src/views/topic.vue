<template>
  <zd-editor :show-editor.sync="showEditor" :is-comment="isComment" :is-reply="isReply" :topic-title="article.title"
             :to-username="toUsername" :topic-type="article.type"></zd-editor>
  <nv-header></nv-header>
  <div class="container">
    <zd-crumbs :topic-type="article.type"></zd-crumbs>

    <div class="alert alert-info" v-show="!isExist">
      没有查找到对应文章
    </div>

    <div v-show="isExist">
        <h1>
          <span class="topic-title light-blue lighten-4">{{ article.title }}</span>
        </h1>

        <div class="row light-blue lighten-4 card-box">
          <div class="col s1">
              <!-- <img src="../assets/3.png" style="width:55px;height:55px;border-radius:50%;"> -->
              <div class="user-icon2">{{ article.author_name | firstLetter }}</div>
          </div>
          <div class="col s11">
              <div class="row">

                <a>{{ article.author_name }}</a>
                <a class="group-stage"><small>{{ article.groupStage }}</small></a>
                <a>{{ article.create_at | createTime }}</a>
              </div>
            <div class="row content">
              {{ article.content }}
            </div>
            <div class="row">
              <small class="right">
                <span class="votes">
                  <a><i class="material-icons dp48 ic">keyboard_arrow_up</i></a>
                  <span>0</span>
                  <a><i class="material-icons dp48 ic">keyboard_arrow_down</i></a>
                </span>
              </small>
            </div>
            <div class="row">
              <div class="left">
                <a style="line-height: 3rem;font-size: 1.3rem;display:none;">
                  <span class="tag-item">标签</span>
                  <span class="tag-topic-count">1</span>
                </a>
              </div>
              <div class="right">
                <div class="stats">
                  <span>{{ article.collect_count }}</span><br>
                  <small>帖子</small>
                </div>
                <div class="stats">
                  <span>{{ article.visit_count }}</span><br>
                  <small>浏览</small>
                </div>
                <a class="waves-effect waves-light btn indigo" @click="makeComment">评论</a>
                <a class="waves-effect waves-light btn blue accent-2" @click="addFocusTopic(article.title)" v-show="!hasFocused">关注</a>
                <a class="waves-effect waves-light btn blue" v-show="hasFocused" @click="removeTopicFocus(article.title)">取消关注</a>
              </div>
            </div>
          </div>
        </div>
      <hr>

      <div class="row card-box" v-show="isExist">
        <div class="col s2">
          <h3>评论</h3><br>
          <span v-show="comments==''">暂无评论 ~ ~ ~</span>
        </div>
      </div>

      <ul class="collection replays" v-show="isExist">
        <li class="collection-item avatar" v-for="item in comments">
          <!-- <img src="../assets/3.png" alt="" class="circle"> -->
          <div class="user-icon">{{ item.username | firstLetter }}</div>
          <span class="title lt">
            <strong>{{ item.username }}</strong>
            <a class="group-stage">{{ item.groupStage }}</a>
            <a>{{ item.added | createTime }}</a>
          </span>
          <p class="lt">
            <span v-show="item.type==2" >@ {{ item.toUserName }} </span> &nbsp;
            {{ item.content }}
          </p>
          <p class="lt">
            <small class="right2">
                <span class="post-tools">
                  <a @click="makeReply(item.username)">回复</a>
                  <a>引用</a>
                </span>
              <span class="votes">
                  <a><i class="material-icons dp48 ic">keyboard_arrow_up</i></a>
                  <span>0</span>
                  <a><i class="material-icons dp48 ic">keyboard_arrow_down</i></a>
                </span>
            </small>
          </p>
        </li>
      </ul>
    </div>
    <zd-rooter></zd-rooter>
  </div>
</template>

<script>
    import { actions } from '../store/store';

    export default{
        data(){
            return{
              title:  this.$route.params.title,
              isExist: true,
              article: "",
              comments: "",
              isComment: false,
              isReply: false,
              toUsername: "",
              hasFocused: false,
              showEditor: false
            }
        },
        vuex: {
          actions: actions,
          getters: {
            loginName: ({ user }) => user.loginName,
            lineStatus: ({ lineStatus }) => lineStatus,
            isUpdateTopic: ({ isUpdateTopic }) => isUpdateTopic
          }
        },
        watch: {
          'isUpdateTopic': function (val, oldVal) {
            let flag = false;
            if(val == true) {
              //更新数据
              this.$http.get(
                'http://123.207.167.206:3000/users/topic/'+ this.title,
                {},
                {}).then(function (response) {
                //成功回调
                if(response.ok) {
                  this.article = response.data.body;
                  this.comments = response.data.body.comment;
                  flag = true;
                  if(flag) {
                    this.setUpdateTopic(false);
                    this.isExist = true;
                  }
                } else {
                  Materialize.toast('获取文章内容失败', 3000);
                }
              }, function (response) {
                //回调失败
                this.isExist = false;
              });
            }
          }
        },
        filters: {
            firstLetter(username) {
              if(!username) {
                return username;
              }
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
              } else if(hours > 0){
                return hours + "小时之前";
              } else {
                return "刚刚";
              }
            }
        },
        created: function () {
          this.$http.get(
            'http://123.207.167.206:3000/users/topic/'+ this.title,
            {},
            {}).then(function (response) {
            //成功回调
            if(response.ok) {
              this.article = response.data.body;
              this.comments = response.data.body.comment;
            } else {
              Materialize.toast('获取文章内容失败', 3000);
            }
          }, function (response) {
            //回调失败
            this.isExist = false;
          });

          //获取是否已经关注该文章
          this.$http.get(
            'http://123.207.167.206:3000/users/topic/isFocus/'+ this.title + '/' + this.loginName,
            {},
            {}).then(function (response) {
            //成功回调
            if(response.ok && response.data.body == 'ok') {
              this.hasFocused = true;
            } else {
              this.hasFocused = false;
            }
          }, function (response) {
            Materialize.toast('获取关注数据失败了', 2000);
          });
        },
        methods: {
          makeComment: function () {
            this.showEditor = true;
            this.isComment = true;
            this.isReply = false;
          },
          makeReply: function (username) {
            this.showEditor = true;
            this.isReply = true;
            this.isComment = false;
            this.toUsername = username;
          },
          addFocusTopic: function (title) {
            this.$http.post(
              'http://123.207.167.206:3000/users/accounts/topicfocus/' + this.loginName,
              {
                title: title
              },
              {
                'headers': {
                  "X-Requested-With": "XMLHttpRequest"
                },
                emulateJSON: true,
                crossOrigin: true
              }
            ).then(function (response) {
              if(response.ok) {
                Materialize.toast('关注成功', 3000);
                this.hasFocused = true;
              } else {
                Materialize.toast('关注失败', 3000);
              }
            }, function (response) {
              Materialize.toast('关注失败', 3000);
            });
          },
          removeTopicFocus(title) {
            this.$http.post(
              'http://123.207.167.206:3000/users/canceltopicfocus',
              {
                title: title,
                loginName: this.loginName
              },
              {
                'headers': {
                  "X-Requested-With": "XMLHttpRequest"
                },
                emulateJSON: true,
                crossOrigin: true
              }
            ).then(function (response) {
              if(response.ok) {
                Materialize.toast('取消关注成功', 3000);
                this.hasFocused = false;
              } else {
                Materialize.toast('取消关注失败', 3000);
              }
            }, function (response) {
              Materialize.toast('取消关注失败', 3000);
            })
          }
        },
        components:{
          "nvHeader":require('../components/header.vue'),
          "zdRooter": require('../components/rooter.vue'),
          "zdCrumbs": require('../components/crumbs.vue'),
          "zdEditor": require('../components/editor.vue')
        }
    }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .topic-title {
    font-size: 2.3rem;
    font-weight: bold;
  }
  .content {
    word-wrap: break-word;
    overflow: hidden;
  }
  .stats {
    float: left;
    margin-left: .5rem;
    margin-right: .5rem;
    font-size: 20px;
    text-align: center;
    line-height: 22px;
  }
  .replays {
    margin-top: 3rem;
  }
  .card-box {
    padding:1rem;
  }
  .post-tools {
    padding-right: 10px;
  }
  .post-tools a{
    cursor: pointer;
    margin-right: .5rem;
  }
  .dropdown{
    margin-left: 10px;
  }
  .ic {
    position: relative;
    top: .5rem;
    cursor: pointer;
  }
  .alert-info {
    background-color: #d9edf7;
    border-color: #bce8f1;
    color: #31708f;
  }
  .alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 0;
  }
  .group-stage {
    background-color: black;
    color: white;
    border-radius: 8px;
    padding: 3px;
    font-size: 10px;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
  .tag-item {
    padding: .2em .4em .3em;
    font-size: 85%;
    text-transform: uppercase;
    color: #999;
    font-weight: 700;
    white-space: nowrap;
  }
  .tag-topic-count {
    color: #78acd9;
    padding: 0 .4em .1em;
    font-size: 85%;
    font-weight: 700;
    white-space: nowrap;
    border-left: none;
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
  .user-icon2 {
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
    left:15px;
    vertical-align: middle;
    overflow: hidden;
  }
  .lt {
    margin-left: 1rem !important;
  }
  .right2{
    margin-left: 80%;
  }
</style>
