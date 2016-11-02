<template>
  <nav>
    <div class="nav-wrapper">
      <div class="container">
        <a v-link="{name:'home'}" class="brand-logo left">吹乎</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><a v-link="{name:'categorie'}" title="版面"><i class="material-icons dp48">view_list</i></a></li>
          <li><a v-link="{name:'recent'}" title="最新"><i class="material-icons dp48">access_alarm</i></a></li>
          <li><a v-link="{name:'tags'}" title="话题"><i class="material-icons dp48">loyalty</i></a></li>
          <li><a v-link="{name:'popular'}" title="热门"><i class="material-icons dp48">whatshot</i></a></li>
          <li><a v-link="{name:'member'}" title="会员"><i class="material-icons dp48">person</i></a></li>
          <li><a v-link="{name:'groups'}" title="小组"><i class="material-icons dp48">group</i></a></li>
        </ul>
        <ul id="logged-out-menu" class="right hide-on-med-and-down" v-show="!loginName">
          <li><a v-link="{name:'register'}">注册</a></li>
          <li><a v-link="{name:'login'}">登录</a></li>
        </ul>
        <ul id="logged-in-menu"  class="right hide-on-med-and-down" v-show="loginName">
          <li class="relat" @click.prevent="ShowOrHide">
            <a>通知<span class="new badge" v-if="annotations.length > 0">{{ annotations.length }}</span></a>

            <!-- 下拉菜单 -->
            <ul class="dropdown-menu" :class="{ 'show': annotation}">
              <li v-for="item in annotations">
                <div class="anotation-user-info">
                  <!--<a class="inline"><img src="../assets/3.png"></a>-->
                  <div class="user-img" v-link="{name:'user', params: {loginName: item.username}}">{{ item.username | theOne }}</div>
                  <a class="inline truncate info inleff" :title="item.topicTitle" @click="browseAnnotation(item._id)" v-link="{name: 'topic', params: {title: item.topicTitle==null?item.pubTitle:item.topicTitle}}">
                    <strong>{{ item.username }}</strong>
                    <span v-show="item.topicTitle != null">在 “{{ item.topicTitle }}”</span>
                    <span>{{ item.action | act }}了</span>
                    <strong v-show="item.pubTitle != null">“{{ item.pubTitle }}”</strong>
                    <strong v-show="item.author != null">{{ item.author }}</strong>
                  </a>
                </div>
              </li>
              <li class="notif-dropdown-link" v-show="annotations.length == 0">
                <a>您没有新的通知</a>
              </li>
              <li class="notif-dropdown-link">
                <a class="mark-all-read" @click="browseAllAnnotation">标记全部为已读</a>
              </li>
              <li class="notif-dropdown-link">
                <a v-link="{name:'annotation'}">查看全部消息</a>
              </li>
            </ul>
          </li>
          <li class="relat" @click.prevent="ShowOrHide2">
            <a>聊天<span class="new badge" v-if="chatList.length>0">{{ chatList.length }}</span></a>
            <!-- 下拉菜单 -->
            <ul class="dropdown-menu" :class="{ 'show': chat}">
              <li v-for="item in chatList">
                <div class="anotation-user-info">
                  <!--<a class="inline"><img src="../assets/3.png"></a>-->
                  <div class="user-img" v-link="{name:'user', params: {loginName: item.withUserName}}">{{ item.withUserName | theOne }}</div>
                  <a class="inline truncate info inleff" @click="browseChat(item.withUserName)" v-link="{name: 'chatSome', params:{loginName:item.withUserName}}">
                    <strong>{{ item.withUserName }}</strong>
                  </a>
                </div>
              </li>
              <li class="notif-dropdown-link" v-show="chatList.length == 0">
                <a>您没有新的聊天</a>
              </li>
              <li class="notif-dropdown-link">
                <a v-link="{name:'chat'}">查看所有对话</a>
              </li>
            </ul>
          </li>

          <li class="relat" @click.prevent="ShowOrHide3">
            <a class='dropdown-button'>
              <div  class="user-icon">{{ letterOfUser }}</div>
            </a>
            <!-- 下拉菜单 -->
            <ul class="dropdown-menu2" :class="{ 'show': userbox}">
              <li class="info2 username">
                <div class="user-status" :class="lineOfStatus"></div>
                <div class="nickname"><a @click="isUser(loginName)" v-link="{name:'user',params:{ loginName:loginName }}">{{loginName}}</a></div>
              </li>
              <li class="notif-dropdown-link2 middlebox">
                <div class="cols">
                  <div class="line-status online"></div>
                  <a class="truncate info2" @click="setStatus(1)">
                    <strong>在线</strong>
                  </a>
                </div>

                <div class="cols">
                  <div class="line-status leave"></div>
                  <a class="truncate info2" @click="setStatus(2)">
                    <strong>离开</strong>
                  </a>
                </div>

                <div class="cols">
                  <div class="line-status sorry"></div>
                  <a class="truncate info2" @click="setStatus(3)">
                    <strong>请勿打扰</strong>
                  </a>
                </div>

                <div class="cols">
                  <div class="line-status away"></div>
                  <a class="truncate info2" @click="setStatus(4)">
                    <strong>隐身</strong>
                  </a>
                </div>
              </li>
              <li class="notif-dropdown-link2 info2">
                <div class="quit">
                  <a @click="quit">退出</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { actions } from '../store/store'

//noinspection JSDuplicatedDeclaration
  export default {
  data () {
    return {
      annotation: false,
      annotations: "",
      chat: false,
      path: this.$route.path,
      userbox: false,
      chatList: ""
    }
  },
  created: function () {
    //监听聊天事件
    this.socket = io.connect('http://localhost:3000');
    let userName = this.loginName;
    this.socket.on('update:' + userName, (from, to, msg)=>{
      this.$http.get(
        'http://123.207.167.206:3000/users/chatrecord/list/' + this.loginName,
        {},
        {
          'headers': {
            "X-Requested-With": "XMLHttpRequest"
          },
          emulateJSON: true,
          crossOrigin: true
        }).then(function(response){
        if(response.ok) {
          this.chatList = response.data.message;
        } else {
          console.log("failed: " + response.data);
        }
      }, function(response){
        Materialize.toast('获取聊天列表失败', 3000);
        console.log("failed: " + response.data);
      });
    });

    //获取用户状态
    if(this.loginName == null || this.loginName == "") {
      return;
    }
    this.$http.get(
      'http://123.207.167.206:3000/users/accounts/'+ this.loginName,
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
        let data = response.data.message;
        this.setStatus(data.lineStatus);
        //this.annotations = data.annotation;
      }
    }, function (response) {
      //回调失败
      console.log('failed!!!');
    });

    //获取未读的通知
    this.$http.get(
      'http://123.207.167.206:3000/users/accounts/annotation/'+ this.loginName,
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
        this.annotations = JSON.parse(response.data.message);
      }
    }, function (response) {
      //回调失败
      console.log('failed!!!');
    });
  },
  ready: function(){
    //获取聊天用户列表  eg: http://123.207.167.206:3000/users/chatrecord/list/admin
    this.$http.get(
      'http://123.207.167.206:3000/users/chatrecord/list/' + this.loginName,
      {},
      {
        'headers': {
          "X-Requested-With": "XMLHttpRequest"
        },
        emulateJSON: true,
        crossOrigin: true
      }).then(function(response){
        if(response.ok) {
          this.chatList = response.data.message;
        } else {
          Materialize.toast('获取聊天列表失败', 3000);
          console.log(response.data);
        }
    }, function(response){
      Materialize.toast('获取聊天列表失败', 3000);
      console.log(response.data);
    });
  },
  filters: {
    'act': function (action) {
      if(action == 'comment'){
        return '评论';
      } else if(action == 'public'){
        return '发布';
      } else if(action == 'reply'){
        return '回复';
      }
    },
    'theOne': function (username) {
      return username.substr(0, 1);
    }
  },
  computed: {
    letterOfUser: function () {
      return this.loginName.substr(0, 1);
    },
    lineOfStatus: function () {
      //noinspection JSUnresolvedVariable
      switch (this.lineStatus) {
        case 1: return "online";
        case 2: return "leave";
        case 3: return "sorry";
        case 4: return "away";
      }
    }
  },
  vuex: {
    actions: actions,
    getters: {
      loginName: ({ user }) => user.loginName,
      lineStatus: ({ lineStatus }) => lineStatus
    }
  },
  methods: {
    ShowOrHide: function(){
      this.chat = false;
      this.userbox = false;
      this.annotation = !this.annotation;
    },
    ShowOrHide2: function () {
      this.annotation = false;
      this.userbox = false;
      this.chat = !this.chat;
    },
    ShowOrHide3: function () {
      this.annotation = false;
      this.chat = false;
      this.userbox = !this.userbox;
    },
    quit: function () {
      localStorage.loginName = "";
      this.setStatus(2);
      window.location.reload();
      this.$router.go({name: home});
    },
    isUser: function (loginName) {
      let arr = this.path.split("/");
      let length = arr.length;
      if(arr[1] == "user") {
        if(length==3 && arr[2] != "") {
          this.$route.params.loginName = loginName;
          location.reload();
          return false;
        }
      }
    },
    browseAnnotation: function (id) {
      this.$http.post(
        'http://123.207.167.206:3000/users/read/annotation',
        {
          loginName: this.loginName,
          id: id
        },
        {
          'headers': {
            "X-Requested-With": "XMLHttpRequest"
          },
          emulateJSON: true,
          crossOrigin: true
        }).then(function(response){
        if(response.ok) {
          Materialize.toast('已经设置阅读过了', 3000);
        } else {
          Materialize.toast('设置阅读失败', 3000);
        }
      }, function(response){
        Materialize.toast('设置阅读失败', 3000);
      });
    },
    browseAllAnnotation: function () {
      this.$http.post(
        'http://123.207.167.206:3000/users/read/all/annotation',
        {
          loginName: this.loginName
        },
        {
          'headers': {
            "X-Requested-With": "XMLHttpRequest"
          },
          emulateJSON: true,
          crossOrigin: true
        }).then(function(response){
        if(response.ok) {
          this.annotations = "";
          Materialize.toast('已经设置全部阅读过了', 3000);
        } else {
          Materialize.toast('设置阅读失败', 3000);
        }
      }, function(response){
        Materialize.toast('设置阅读失败', 3000);
      });
    },
    browseChat: function (username) {
      //先判断是否已经为聊天界面，如果是那么刷新   如何不刷新？待解决。。。。。。。。。。
      let flag = true;  // 默认为跳转，如果跳转目标为本身则不跳转（false）
      let arr = this.path.split("/");
      let length = arr.length;
      if(arr[1] == "chat") {
        if(length==3 && arr[2] != "") {
          this.$route.params.loginName = username;
          location.reload();
          flag = false;
        }
      }

      this.$http.post(
        'http://123.207.167.206:3000/users/read/chat',
        {
          loginName: this.loginName,
          username: username //和谁聊天
        },
        {
          'headers': {
            "X-Requested-With": "XMLHttpRequest"
          },
          emulateJSON: true,
          crossOrigin: true
        }).then(function(response){
        if(response.ok) {
          this.annotations = "";
          Materialize.toast('已经设置全部阅读过了', 3000);
          if(flag == false ) {
            return false;
          }
        } else {
          Materialize.toast('设置阅读失败', 3000);
        }
      }, function(response){
        Materialize.toast('设置阅读失败', 3000);
      });
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    box-sizing:border-box;
  }
  nav {
    margin-bottom: 20px;
  }
  .nav-wrapper {
    min-width: 75px;
  }
  .container {
    height:100%;
  }
  #nav-mobile{
    margin-left: 100px;
  }
  .user-icon {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 1.8rem;
    border: 0 none;
    background-color: #a1faeb;
    display: inline-block;
    text-align: center;
    color: #f44336;
    font-weight: normal;
  }
  .relat{
    position: relative !important;
  }

  .dropdown-menu {
    right: 0;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 160px;
    width: 300px;;
    padding: 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 0;
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,0.175);
    box-shadow: 0 6px 12px rgba(0,0,0,0.175);
    background-clip: padding-box;
  }

  .dropdown-menu2 {
    right: 0;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 160px;
    padding: 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 0;
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,0.175);
    box-shadow: 0 6px 12px rgba(0,0,0,0.175);
    background-clip: padding-box;
  }

  .show {
    display: block !important;
  }

  .notif-dropdown-link {
    border-top: 1px solid rgba(163,163,163,0.5);
    width:300px;
  }
  .dropdown-menu>li>a {
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: normal;
    line-height: 1.42857143;
    color: #333;
    white-space: nowrap;
  }
  .notif-dropdown-link a {
    display: block;
    text-align: center;
    padding: .5em 0;
    font-weight: 600;
  }
  .inline {
    float: left;
    height:3rem !important;
  }

  .inline img {
    width:35px;
    height:35px;
    border-radius: 50%;
  }
  .anotation-user-info {
    min-height: 50px;
    padding: 5px;
  }
  .info {
    width:14rem;
    color: #000;
    line-height: 3rem;
    padding: 0 !important;
    font-size: 10px;
  }
  .inleff {
    margin-left: 60px;
  }
  .info2 {
    color: #000;
    padding: 0 !important;
    font-size: 10px;
    height: 3rem;
    text-align: center;
  }

  .notif-dropdown-link2{
    width: 160px;
  }

  .quit, .nickname {
    height:3rem;
    width:160px;
  }

  .quit a, .nickname a {
    color: #000;
    text-decoration: none;
    height:3rem;
    width:160px;
    padding-bottom: 5px;
    font-size: 15px;
  }
  .username {
    width: 160px;
    padding-bottom: 5px;
    cursor: pointer;
  }

  .middlebox{
    border-bottom: 1px solid rgba(0,0,0,0.15);
    border-top: 1px solid rgba(0,0,0,0.15);
  }
  .middlebox a{
    display: inline-block;
  }
  .line-status {
    display: inline-block;
    width: 12px;
    height:12px;
    border-radius: 50%;
    position: relative;
    top:-0.4rem;
  }
  .user-status{
    width: 12px;
    height:12px;
    border-radius: 50%;
    position: absolute;
    top:1.5rem;
    left: 20px;
  }
  .line-status.online, .user-status.online {
    background-color: #4CAF50;
  }
  .line-status.leave, .user-status.leave{
    background-color: #ff6d00;
  }
  .line-status.sorry, .user-status.sorry{
    background-color: #F44336;
  }
  .line-status.away, .user-status.away {
    background-color: #555;
  }
  .cols {
    height: 3rem;
    width:160px;
    padding-left: 3rem;
  }

  .cols a:hover {
    background-color: #fff !important;
  }

  .user-img {
    border-radius: 50%;
    width: 42px;
    height: 42px;
    line-height: 2.6rem;
    font-size: 2rem;
    display: inline-block;
    text-align: center;
    color: #eee;
    font-weight: normal;
    background-color: #f44336;
    position: absolute;
    left: 15px;
    vertical-align: middle;
    overflow: hidden;
  }

</style>
