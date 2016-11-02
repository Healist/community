<template>
  <nv-header></nv-header>
  <div class="container">

    <div class="account" v-show="isUserExist">
      <zd-user-title></zd-user-title>
      <zd-crumbs></zd-crumbs>
      <div class="profile row">
        <h1 class="fullname">{{ accountName }}</h1>
        <h2 class="username">@{{ accountName }}</h2>
        <div class="account-stats">
          <div class="stat">
            <div class="human-readable-number" title="">{{ postCount }}</div>
            <span class="stat-label">帖子</span>
          </div>
          <div class="stat">
            <div class="human-readable-number" title="">{{ browseCount }}</div>
            <span class="stat-label">资料浏览</span>
          </div>
          <div class="stat">
            <div class="human-readable-number" title="">{{ followerCount }}</div>
            <span class="stat-label">粉丝</span>
          </div>
          <div class="stat">
            <div class="human-readable-number" title="">{{ idolCount }}</div>
            <span class="stat-label">关注</span>
          </div>
        </div>
        <div class="text-center profile-meta">
          <span>注册时间</span>
          <strong class="timeago" :title="regTime">{{ registerTime }}</strong>
          <span>最后登录</span>
          <Strong class="timeago" :title="lsLogin">{{ lastLogin }}</Strong>
          <br/>
          <span>电子邮件</span>
          <strong>{{ email }}</strong>
        </div>
      </div>
    </div>

    <user-not-found  v-show="!isUserExist"></user-not-found>

    <zd-rooter></zd-rooter>
  </div>
</template>

<script>
    import { actions } from '../store/store'

    //noinspection JSUnresolvedFunction
    export default{
        data(){
            return {
              userInfoBox: false,
              accountName: this.$route.params.loginName,  //当前浏览的用户
              regTime: "",
              lsLogin: "",
              email: "",
              postCount: "",
              browseCount: "",
              idolCount: "",
              followerCount: "",
              isUserExist: true
            }
        },
        vuex: {
          actions: actions,
          getters: {
            loginName: ({ user }) => user.loginName,
            lineStatus: ({ lineStatus }) => lineStatus
          }
        },
        watch: {
          'accountName': function (val, oldVal) {
            Materialize.toast('changed!!', 3000);
          },
          'userInfoBox': function (val, oldVal) {
            Materialize.toast('changed! box!', 3000);
          }
        },
        created: function () {
          this.$http.get(
            'http://123.207.167.206:3000/users/accounts/'+ this.accountName,
            {},
            {}).then(function (response) {
            //成功回调
            if(response.ok) {
              let data = response.data.message;
              this.regTime = data.createAt;
              this.lsLogin = data.lastLogin;
              this.email = data.email;
              this.postCount = data.postCount || 0;
              this.browseCount = data.browseCount || 0;
              this.idolCount = data.idols.length;
              this.followerCount = data.followers.length;
            }
          }, function (response) {
            //回调失败
            this.isUserExist = false;
          })
        },
        computed: {
          letterOfUser: function () {
            //noinspection JSUnresolvedVariable
            return this.accountName.substr(0, 1);
          },
          registerTime: function () {
            let now = Date.now();
            now = new Date(now);
            if(typeof this.regTime === 'string') {
              this.regTime = new Date(this.regTime);
            }
            let year = now.getFullYear() - this.regTime.getFullYear();
            let month = now.getMonth() - this.regTime.getMonth();
            let days = now.getDate() - this.regTime.getDate();
            if( year>0 ) {
              return year + "年之前";
            } else if (month > 0) {
              return month + "月之前";
            } else {
              return days + "天之前";
            }
          },
          lastLogin: function () {
            let now = Date.now();
            now = new Date(now);
            if(typeof this.lsLogin === 'string') {
              this.lsLogin = new Date(this.lsLogin);
            }
            let year = now.getFullYear() - this.lsLogin.getFullYear();
            let month = now.getMonth() - this.lsLogin.getMonth();
            let days = now.getDate() - this.lsLogin.getDate();
            if( year>0 ) {
              return "很久之前";
            } else if (month > 0) {
              return month + "个月之前";
            } else {
              return "大约" + days + "天之前";
            }
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
          showInfo: function () {
            this.userInfoBox = !this.userInfoBox;
          },
          addFocus: function () {
            this.$http.post(
              'http://123.207.167.206:3000/users/accounts/focus/' + this.loginName,
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
              Materialize.toast('关注成功', 3000);
            }, function (response) {
              Materialize.toast('关注失败', 3000);
            });
          }
        },
        components: {
          "nvHeader":require('../components/header.vue'),
          "zdRooter": require('../components/rooter.vue'),
          "zdCrumbs": require('../components/crumbs.vue'),
          "zdUserTitle": require('../components/userTitle.vue'),
          "userNotFound": require('../components/userNotFound.vue')
        }
    }
</script>


<style scoped>
  * {
    box-sizing: border-box;
  }
  .account>.row {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .account .profile .fullname {
    margin-bottom: 12px;
    font-size: 32px;
  }
  .account>.row .fullname {
    text-align: center;
    font-size: 3rem;
    color: #777;
    font-weight: 300;
    margin-bottom: 24px;
  }
  h1, .h1 {
    font-size: 36px;
    margin-top: 20px;
    line-height: 1.1;
  }
  .account .profile .username {
    text-transform: uppercase;
    text-align: center;
    margin-top: 0;
    font-size: 15px;
  }
  .account .profile .account-stats {
    text-align: center;
    font-size: 35px;
    line-height: 25px;
    margin-top: 25px;
    margin-bottom: -20px;
  }
  .account .profile .account-stats .stat {
    display: inline-block;
    min-width: 100px;
    margin-bottom: 20px;
  }
  .account .profile .account-stats .stat-label {
    font-size: 12px;
    text-transform: uppercase;
    color: #777;
  }
  .account .profile .profile-meta {
    font-size: 10px;
    text-transform: uppercase;
    color: #777;
    margin-top: 25px;
  }
  .text-center {
    text-align: center;
  }
  .account .profile .profile-meta strong {
    color: #333;
    font-weight: bold;
  }

</style>
