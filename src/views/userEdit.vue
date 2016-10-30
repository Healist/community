<template>
  <nv-header></nv-header>
  <div class="container">
    <div class="account" v-show="isUserExist">
      <zd-user-title></zd-user-title>
      <zd-crumbs></zd-crumbs>

      <div class="row">
        <div class="col s2">
          <div class="account-picture-block text-center">
            <div class="row" style="paddig:1rem;">
              <div class="col s12">
                <div class="avatar red">
                  {{ letterOfUser }}
                </div>
              </div>
            </div>
            <div class="collection">
              <a class="collection-item">更改头像</a>
              <a class="collection-item">更改邮箱</a>
              <a class="collection-item">更改密码</a>
            </div>
          </div>
          <div class="valign-wrapper">
            <a class="waves-effect waves-light btn valign">删除账号</a>
          </div>
        </div>
        <div class="col s8">
          <div class="row">
            <div class="input-field col s12">
              <input disabled id="username" type="text" class="validate">
              <label for="username">姓名</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input disabled id="website" type="text" class="validate">
              <label for="website">个人网站</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input disabled id="position" type="text" class="validate">
              <label for="position">位置</label>
            </div>
          </div>
          <input disabled type="date" class="datepicker" placeholder="生日">
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea1" class="materialize-textarea"></textarea>
              <label for="textarea1">About me</label>
            </div>
            <a class="waves-effect waves-light btn valign">保存</a>
          </div>
        </div>
        <div class="col s2">
          <div class="collection">
            <a href="#!" class="collection-item">点击这里关联
              GitHub</a>
            <a href="#!" class="collection-item">点击这里关联
              twitter</a>
            <a href="#!" class="collection-item">点击这里关联
              QQ</a>
            <a href="#!" class="collection-item">点击这里关联
              微博</a>
          </div>
        </div>
      </div>

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
              isUserExist: true
            }
        },
      created: function () {
        Materialize.toast('站主比较懒，信息修改页面功能还没做呢', 3000);
        this.$http.get(
          'http://localhost:3000/users/accounts/'+ this.accountName,
          {},
          {}).then(function (response) {
          //成功回调
          if(response.ok) {
            let data = response.data.message;
          }
        }, function (response) {
          //回调失败
          this.isUserExist = false;
        })
      },
      ready: function () {

      },
      computed: {
        letterOfUser: function () {
          //noinspection JSUnresolvedVariable
          return this.accountName.substr(0, 1);
        }
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
  .account-picture-block {
    vertical-align: top;
    margin-bottom: 20px;
  }
  .text-center {
    text-align: center;
  }
  .avatar {
    border-radius: 50%;
    width: 128px;
    height: 128px;
    line-height: 128px;
    font-size: 7.5rem;
    margin-bottom: 10px;
    display: inline-block;
    text-align: center;
    color: #eee;
    font-weight: normal;
  }
</style>
