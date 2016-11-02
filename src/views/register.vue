<template>
  <div>
    <nv-header></nv-header>
    <div class="container">
      <zd-crumbs></zd-crumbs>

      <div class="register-box">
        <form action="http://123.207.167.206:3000/users/register" method="post">
          <div class="row">
            <div class="input-field col s12">
              <input id="username" type="text" class="validate" name="username">
              <label for="username">用户名</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" name="email">
              <label for="email">邮箱</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" name="password">
              <label for="password">密码</label>
            </div>
          </div>

          <button class="btn waves-effect waves-light blue darken-2" type="submit" name="action" @click="submit">注册
            <i class="material-icons dp48 right">input</i>
          </button>
        </form>
      </div>

      <zd-rooter></zd-rooter>
    </div>
  </div>
</template>

<script>
    //noinspection JSUnresolvedFunction
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
          nvHeader: require('../components/header.vue'),
          zdCrumbs: require('../components/crumbs.vue'),
          zdRooter: require('../components/rooter.vue')
        },
        methods: {
          submit: function () {
            let username = $('#username').val();
            let email    = $('#email').val();
            let password = $('#password').val();

            //noinspection JSUnresolvedVariable
            this.$http.post(
              'http://123.207.167.206:3000/users/register',
              {
                username: username,
                password: password,
                email:    email
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
                  this.$router.go({name: 'user',params: {loginName: username}});
                  location.reload();
                } else {
                  alert("注册失败了，请重试");
                }
            });
          }
        }
    }
</script>

<style scoped>
  .register-box {
    padding:2rem;
    background-color: #f5f5f5;
  }
</style>
