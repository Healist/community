<template>
  <nv-header></nv-header>
  <div class="container">
    <div class="account" v-show="isUserExist">
      <zd-user-title></zd-user-title>
      <zd-crumbs></zd-crumbs>
      <h3>{{accountName}} &nbsp; 关注的人</h3>
      <ul class="users-container" v-show="idols != ''">
        <li class="users-box registered-user" v-for="item in idols">
          <a>
            <div class="user-icon">{{ item.username | firstLetter }}</div>
          </a><br>
          <div class="user-info">
            <span>
              <div class="circle status-label status online"></div>
              <a v-link="{name: 'user', params: {loginName: item.username}}">{{ item.username }}</a>
            </span>
          </div>
        </li>
      </ul>
      <div class="alert alert-warning text-center" v-show="idols==''">此用户还没有关注别人 :(</div>
    </div>

    <user-not-found  v-show="!isUserExist"></user-not-found>

    <zd-rooter></zd-rooter>
  </div>
</template>

<script>
    export default{
        data(){
            return{
              accountName: this.$route.params.loginName,  //当前浏览的用户
              isUserExist: true,
              idols: ""
            }
        },
        filters: {
          firstLetter(username) {
            return username.substr(0, 1);
          }
        },
        created: function () {
          this.$http.get(
            'http://localhost:3000/users/accounts/'+ this.accountName,
            {},
            {}).then(function (response) {
            //成功回调
            if(response.ok) {
              let data = response.data.message;
              //获取该用户也关注的人
              //console.log(data);
              this.idols = data.idols;
            }
          }, function (response) {
            //回调失败
            this.isUserExist = false;
          })
        },
        components:{
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
  ul, ol {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .users-container {
    padding: 0;
    list-style-type: none;
  }
  .users-container .users-box {
    display: inline-block;
    margin-top: 20px;
    text-align: center;
    vertical-align: top;
    width: 104px;
  }
  .users-container li {
    padding-bottom: 10px;
  }
  .users-container .users-box a {
    max-width: 94px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .status.online {
    color: #4CAF50;
  }
  .status-label {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background-color: #00C853;
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
  .status {
    font-size: 10px;
    vertical-align: middle;
  }
  .user-icon {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 4rem;
    display: inline-block;
    text-align: center;
    color: #eee;
    font-weight: normal;
    background-color: #f44336;
  }
  .alert-warning {
    background-color: #fcf8e3;
    border-color: #faebcc;
    color: #8a6d3b;
  }
  .alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 0;
  }
  .text-center {
    text-align: center;
  }
</style>
