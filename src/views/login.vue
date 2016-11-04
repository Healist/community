<template>
    <div>
      <nv-header></nv-header>
      <div class="container">
        <zd-crumbs></zd-crumbs>

        <div class="login-box">
          <form action="http://123.207.167.206:3000/users/login" method="post">
            <div class="row">
              <div class="input-field col s12">
                <input id="username" type="text" class="validate" name="username">
                <label for="username">用户名</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="password" type="password" class="validate">
                <label for="password">密码</label>
              </div>
            </div>

            <button class="btn waves-effect waves-light blue darken-2" type="submit" name="action" @click="submit">登陆
              <i class="material-icons dp48 right">input</i>
            </button>
          </form>
        </div>

        <zd-rooter></zd-rooter>
      </div>
    </div>
</template>

<script>
  import { actions } from '../store/store'
  //noinspection JSUnresolvedFunction
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {
            nvHeader: require('../components/header.vue'),
            zdCrumbs: require('../components/crumbs.vue'),
            zdRooter: require('../components/rooter.vue')
        },
        vuex: {
          actions: actions,
          getters: {
            loginName: ({ user }) => user.loginName
          }
        },
      methods: {
        submit: function () {
          let username = $('#username').val();
          let password = $('#password').val();

          if(username == "" || password == "") {
            Materialize.toast('表单有空值，请重试', 3000);
            return;
          }

          //noinspection JSUnresolvedVariable
          this.$http.post(
            'http://123.207.167.206:3000/users/login',
            {
              username: username,
              password: password
            },
            {
              'headers': {
                "X-Requested-With": "XMLHttpRequest"
              },
              emulateJSON: true,
              crossOrigin: true
            }).then(function (response) {
            var isSuccess = response.ok;
            if(isSuccess) {
              localStorage.setItem("loginName", username);
              window.location.reload();
              this.setStatus(1);
              this.$router.go({name: 'home'});
            } else {
              Materialize.toast('登陆失败，请重试', 3000);
            }
          }, function (response) {
            Materialize.toast('登陆失败，请重试', 3000);
          });
        }
      }
    }
</script>

<style scoped>
  .login-box {
    padding:2rem;
    background-color: #f5f5f5;
  }
</style>
