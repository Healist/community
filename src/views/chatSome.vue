<template>
  <nv-header></nv-header>
  <div class="container">
    <zd-crumbs></zd-crumbs>
    <div class="row" v-show="isExist">
      <div class="col s4">
        <ul class="collection">
          <li class="collection-item avatar co">
            <img src="../assets/3.png" alt="" class="circle">
            <span class="title">{{ accountName }}</span>
            <p>
              聊天内容概要
            </p>
            <a href="#!" class="secondary-content"><i class="mdi-action-grade"></i></a>
          </li>
        </ul>
      </div>
      <div class="col s8">
        <div class="expanded-chat">
          <h3>{{ accountName }}</h3>
          <span>
            <a href="#">最新</a>
            <a href="#" class="space">7天</a>
            <a href="#" class="space">30天</a>
            <a href="#" class="space">3个月</a>
          </span>
          <ul class="chat-content" v-scroll-bottom="chat">
            <li class="chat-message clear" v-for="item in chat">
              <div class="message-header">
                <a href="#">
                  <div class="user-icon chat-user-image space red">
                    <span v-show="item.isActive">{{ loginName | theOne }}</span>
                    <span v-show="!item.isActive">{{ item.withUserName | theOne }}</span>
                  </div>
                  <strong><span class="chat-user space" v-show="item.isActive">自己</span></strong>
                  <strong><span class="chat-user space" v-show="!item.isActive">{{ item.withUserName }}</span></strong>
                  <span class="chat-timestamp timeago space" title="Mon Sep 19 2016 11:17:47 GMT+0800 (中国标准时间)">{{ item.createAt | createAt }}</span>
                </a>
               </div>
              <div class="message-body">
                <p>{{ item.content }}</p>
              </div>
            </li>
          </ul>
          <div class="input-group">
            <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" class="chat-input" rows="1" @keyup="onKeyup"></textarea>
            <a class="waves-effect waves-light btn blue send-btn" @click="sendMessage">发送</a>
          </div>
        </div>
      </div>
    </div>

    <user-not-found  v-show="!isExist"></user-not-found>
    <zd-rooter></zd-rooter>
  </div>
</template>

<script>
  import { actions } from '../store/store'

  export default{
    data(){
      return{
        accountName: this.$route.params.loginName,
        socket: null,
        content: "",
        isExist: true,
        chat: ""
      }
    },
    vuex: {
      actions: actions,
      getters: {
        loginName: ({ user }) => user.loginName,
        lineStatus: ({ lineStatus }) => lineStatus
      }
    },
    filters: {
      'theOne': function (name) {
        return name.substr(0, 1);
      },
      'createAt': function (date) {
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
          return "很久之前";
        } else if (month > 0) {
          return month + "个月之前";
        } else if(days>0) {
          return "大约" + days + "天之前";
        } else if(hours>0){
          return "大约" + hours + "小时之前";
        } else {
          return "刚刚";
        }
      }
    },
    created: function () {
      //根据用户名获取与该浏览好友的聊天内容
      //连接服务器
      this.socket = io.connect('http://localhost:3000');
      let userName = this.loginName;

      this.socket.on('connected', function (connectTime) {
        console.log(userName + "于"+ connectTime.time + "连接上聊天服务器");
      });
      //连接之后的监听
      this.socket.on('sendFailed', function(){
        Materialize.toast('发送失败啦', 3000);
      });
      //监听需要更新自己的事件  用箭头函数解决this
      this.socket.on('update:' + userName, (from, to, msg)=>{
        this.$http.get(
          'http://localhost:3000/users/chat/'+ this.loginName + '/' + this.accountName,
          {},
          {}).then(function (response) {
          //成功回调
          if(response.ok) {
            let data = JSON.parse(response.data.message);
            this.chat = data;
          } else {
            Materialize.toast('更新出现问题，请刷新', 3000);
          }
        }, function (response) {
          //回调失败
          this.isExist = false;
          Materialize.toast('未查找到该用户', 3000);
        });
      });
      //监听断开连接
      this.socket.on('disconnect', function () {
        console.log(userName + "disconnect");
      });
    },
    directives: {
      // 发送消息后滚动到底部
      'scroll-bottom' () {
        this.vm.$nextTick(() => {
          this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight;
        });
      }
    },
    ready: function () {
      //获取登陆用户的聊天内容
      this.$http.get(
        'http://localhost:3000/users/chat/'+ this.loginName + '/' + this.accountName,
        {},
        {}).then(function (response) {
        //成功回调
        if(response.ok) {
          let data = JSON.parse(response.data.message);
          this.chat = data;
        } else {
          this.isExist = false;
          Materialize.toast('未查找到该用户', 3000);
        }
      }, function (response) {
        //回调失败
        this.isExist = false;
        Materialize.toast('未查找到该用户', 3000);
      })
    },
    methods: {
      sendMessage () {
        let content = $('.chat-input').val();
        if(content!="") {
          this.socket.emit('private message', this.loginName, this.accountName, content);
          $('.chat-input').val("");
        } else {
          Materialize.toast('发送内容为空', 3000);
        }
      },
      onKeyup (e) {
        if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
          this.sendMessage(this.content);
          this.content = '';
        }
      }
    },
    components: {
      "nvHeader":require('../components/header.vue'),
      "zdRooter": require('../components/rooter.vue'),
      "zdCrumbs": require('../components/crumbs.vue'),
      "userNotFound": require('../components/userNotFound.vue')
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .expanded-chat {
    background-image: url(http://localhost:3030/static/img/chat_bg.png);
  }
  .expanded-chat .chat-content {
    padding-top: 10px;
  }
  .expanded-chat .chat-content, .chat-modal .chat-content {
    max-height: 350px;
    min-height: 280px;
    overflow-y: auto;
    overflow-x: hidden;
    resize: none;
    word-wrap: break-word;
    margin: 0;
    margin-top: 1rem !important;
  }
  li.chat-message {
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px solid #eee;
    background-color: black;
    opacity: 0.6;
    color: white;
  }
  /*li.chat-message:last-child {*/
    /*padding-bottom: 1.428rem;*/
  /*}*/
  .message-body {
    margin-left: 45px;
  }
  .chat-user-image {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 1.6rem;
    float: left;
  }
  .user-icon {
    display: inline-block;
    text-align: center;
    color: #eee;
    font-weight: normal;
  }
  .space {
    margin-left: 1rem;
  }
  .chat-input {
    width: 85%;
    height: 3rem;
    float: left;
    border-right: none;
  }
  .input-group {
    height: 3rem;
    overflow: hidden;
    background-color: white;
    opacity: 0.8;
    color: black;
  }
  .send-btn {
    width: 15%;
    height:3rem;
    float: left;
  }
  .co {
    background: #337ab7;
    color: white;
  }

</style>

