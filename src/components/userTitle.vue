<template>
  <div class="bg-cover" v-show="chatBoxShow">
    <div class="questionbox">
      <div class="content-head">
        <span class="title">和 {{ accountName }} 聊天 </span>
        <span class="close" @click="closeChat"><a>X</a></span>
      </div>
      <div class="content-box">
        <span>
          <a>最新</a>
          <a>7天</a>
          <a>30天</a>
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


  <div class="cover initialised" >
    <div class="avatar-wrapper">
      <div class="avatar avatar-lg avatar-rounded" style="background-color: #f44336;"> {{ letterOfUser }} </div>
      <div class="status fa-circle" :class="lineOfStatus"></div>
    </div>

    <div class="container">
      <div class="btn-group account-fab" style="">
        <a class="btn-floating btn-large blue" @click="showInfo">
          <i class="material-icons dp48">more_vert</i>
        </a>
        <ul v-show="userInfoBox">
          <li><a class="btn-floating red" v-link="{name:'userEdit',params:{loginName: accountName}}" v-show="!self">编辑</a></li>
          <li><a class="btn-floating yellow darken-1 hide">设置</a></li>
          <li><a class="btn-floating blue" @click="openChat" v-show="self">聊天</a></li>
          <li><a class="btn-floating green" v-link="{name: 'userFollower', params: {loginName: accountName}}">粉丝</a></li>
          <li><a class="btn-floating yellow" v-link="{name:'userFollowing',params:{loginName: accountName}}">偶像</a></li>
          <li v-show="!hasFocused"><a class="btn-floating blue" @click="addFocus" v-show="self">关注</a></li>
          <li v-show="hasFocused"><a class="btn-floating blue" v-show="self" @click="removeFocus">取关</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div style="width:100%;height:368px;display:block;"></div>
</template>

<script>
  import { actions } from '../store/store'

    export default{
      data(){
        return {
          userInfoBox: false,
          socket: null,
          content: "",
          accountName: this.$route.params.loginName,  //当前浏览的用户
          hasFocused: false,
          chatBoxShow: false,
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
          let days = now.getDay() - date.getDay();
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
        //判断是否已经关注过该用户
        this.$http.get(
          'http://localhost:3000/users/hasfocus/' + this.loginName + '/' + this.accountName,
          {},
          {}
        ).then(function (response) {
          if(response.ok) {
            let res = response.data.body;
            this.hasFocused = (res == 'ok');
          }
        }, function (response) {
          console.log("请求是否关注时出现问题");
        });

        //chat连接
        //根据用户名获取与该浏览好友的聊天内容
        //连接服务器
        this.socket = io.connect('http://localhost:3000');
        let userName = this.loginName;
        let accountName = this.accountName;
        let result = "";

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
      computed: {
        letterOfUser: function () {
          //noinspection JSUnresolvedVariable
          return this.accountName.substr(0, 1);
        },
        self: function () {
          return this.loginName != this.accountName;
        },
        lineOfStatus: function () {
          switch (this.lineStatus) {
            case 1: return "online";
            case 2: return "leave";
            case 3: return "sorry";
            case 4: return "away";
          }
        }
      },
      methods: {
        openChat() {
          this.chatBoxShow = true;
          this.userInfoBox = false;
        },
        closeChat() {
          this.chatBoxShow = false;
        },
        showInfo() {
          this.userInfoBox = !this.userInfoBox;
        },
        addFocus() {
          this.$http.post(
            'http://localhost:3000/users/accounts/focus/' + this.loginName,
            {
              contactName: this.accountName
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
              this.userInfoBox = false;
              this.hasFocused = true;
            } else {
              Materialize.toast('关注失败', 3000);
              this.userInfoBox = false;
            }
          }, function (response) {
            Materialize.toast('关注失败', 3000);
            this.userInfoBox = false;
          })
        },
        removeFocus() {
          this.$http.post(
            'http://localhost:3000/users/cancelfocus/' + this.loginName,
            {
              contactName: this.accountName
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
              Materialize.toast('取关成功', 3000);
              this.userInfoBox = false;
              this.hasFocused = false;
            } else {
              Materialize.toast('取关失败', 3000);
              this.userInfoBox = false;
            }
          }, function (response) {
            Materialize.toast('取关失败', 3000);
            this.userInfoBox = false;
          })
        },
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
    }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .cover .avatar-wrapper, .account .container .avatar-wrapper {
    top: 230px;
  }
  .account .cover .avatar-wrapper {
    position: absolute;
    left: 50%;
    margin-left: -64px;
    top: 232px;
    border: 4px solid white;
    border-radius: 50%;
  }
  .avatar.avatar-rounded {
    border-radius: 50%;
  }
  .avatar.avatar-lg {
    border-radius: inherit;
    width: 128px;
    height: 128px;
    line-height: 128px;
    font-size: 4.5rem;
  }
  .avatar {
    display: inline-block;
    text-align: center;
    color: #eee;
    font-weight: normal;
  }
  .account .cover .avatar-wrapper .status {
    position: absolute;
    font-size: 23px;
    top: 17px;
    right: -1px;
    width: 22px;
    height:22px;
    border:none;
    border-radius: 50%;
  }
  .status.online {
    background-color: #4CAF50;
  }
  .status.leave {
    background-color: #ff6d00;
  }
  .status.sorry {
    background-color: #F44336;
  }
  .status.away {
    background-color: #555;
  }
  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .status {
    font-size: 10px;
    vertical-align: middle;
  }
  .btn-group.account-fab {
    position: absolute;
    right: 1rem;
    top: 272px;
  }
  .btn-group.account-fab ul li{
    text-align: center;
    margin-bottom: .4rem;
  }
  .account .container>* {
    pointer-events: all;
  }
  .btn-group, .btn-group-vertical {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .account .cover, .account .container {
    height: 300px;
  }
  .account .container {
    position: relative;
    pointer-events: none;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }
  .account .cover {
    background-size: cover;
    background-repeat: no-repeat;
    height: 300px;
    margin-bottom: 1em;
    background-origin: content-box;
    width: 100%;
    top: 64px;
    position: absolute;
    left: auto;
    right: 0;
    background-image: url(../assets/cover-default.png);
    background-position: 49.0734% 98.8881%;
  }
  .account .profile {
    margin-bottom: 40px;
  }

  .bg-cover {
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 7;
    transition: 2s;
  }
  .questionbox {
    position: relative;
    width:680px;
    min-height: 400px;
    margin:5rem auto;
    background-color: #fff;
    z-index: 10;
    border-radius: 10px;
  }
  .content-head {
    width: 100%;
    height:40px;
    padding: 6px 30px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
  }
  .content-box {
    padding: 1rem;
    height:auto;
  }
  .chat-content {
    padding-top: 10px;
    max-height: 350px;
    min-height: 280px;
    overflow-y: auto;
    overflow-x: hidden;
    resize: none;
    word-wrap: break-word;
    margin: 0;
  }
  li.chat-message {
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px solid #eee;
    background-color: black;
    opacity: 0.6;
    color: white;
  }
  .title {
    font-size: 1.5rem;
  }
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
  .close {
    float: right;
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    text-align: center;
    line-height: 1.5rem;
    cursor: pointer;
  }
</style>
