<template>
  <nv-header></nv-header>
  <div class="container">
    <zd-crumbs></zd-crumbs>

    <ul class="nav nav-pills">
      <li><a >在线</a></li>
      <li><a >发帖排行</a></li>
      <li><a >威望排行</a></li>
      <li><a >搜索</a></li>
    </ul>

    <ul class="users-container">
      <li class="users-box registered-user" v-for="item in usersList">
        <a v-link="{name:'user',params:{ loginName: item.username }}">
          <div class="user-icon">
            {{ item.username | firstLetter }}
          </div>
        </a>
        <div class="user-info">
          <span>
            <div class="circle status-label status" :class="item.lineStatus | lineStatus"></div>
            <a class="user-name" v-link="{name:'user',params:{ loginName: item.username }}">{{ item.username }}</a>
          </span><br/>
          <div class="joindate">
            <span class="timego">{{ item.createAt | createTime }}</span>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
    export default{
        data(){
            return{
              isOnline: true,
              isLeave: false,
              isAway: false,
              isSorry: false,
               usersList: ""
            }
        },
        filters: {
          'firstLetter': function (username) {
            return username.substr(0, 1);
          },
          'lineStatus': function (lineStatus) {
            if(lineStatus == 1) {
              return 'online';
            } else if(lineStatus == 2) {
              return 'leave';
            } else if(lineStatus == 3) {
              return 'sorry';
            } else if(lineStatus == 4) {
              return 'away';
            }
          },
          'createTime': function (date) {
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
            'http://123.207.167.206:3000/users/all',
            {},
            {}
          ).then(function (response) {
            if(response.ok) {
              console.log(response.data.body);
              this.usersList = response.data.body;
            }
          }, function (response) {

          });
        },
        components:{
          "nvHeader":require('../components/header.vue'),
          "zdCrumbs": require('../components/crumbs.vue')
        }
    }
</script>

<style scoped>
  .online {
    background-color: #4CAF50;
  }
  .leave{
    background-color: #ff6d00;
  }
  .sorry{
    background-color: #F44336;
  }
  .away {
    background-color: #555;
  }
  ul {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    display: block;
    min-height: 50px;
  }
  .nav-pills>li {
    float: left;
    position: relative;
    display: block;
  }
  .nav-pills>li>a {
    border-radius: 0;
    position: relative;
    display: block;
    padding: 10px 15px;
  }
  a {
    color: #337ab7;
    text-decoration: none;
    background-color: transparent;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
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
  .users-box .user-icon {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 4rem;
  }
  .user-icon {
    display: inline-block;
    text-align: center;
    color: #eee;
    font-weight: normal;
    background-color: #f44336;
  }
  .users-container .user-info>span {
    max-width: 94px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
  }
  .status.online {
    color: #4CAF50;
  }
  .status {
    font-size: 10px;
    vertical-align: middle;
  }
  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .status-label{
    width:12px;
    height:12px;
    border: none;
    border-radius: 50%;
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
  .user-name {
    display: inline-block;
    line-height: 12px;
  }

</style>
