<template>
  <nv-header></nv-header>
  <div class="container">
    <zd-crumbs></zd-crumbs>
    <div class="row">
      <div class="col s4">
        <ul class="collection">
          <li class="collection-item avatar admin" @click="toChat(item.withUserName)" v-for="item in chatList">
            <img src="../assets/3.png" alt="" class="circle">
            <span class="title">{{ item.withUserName }}</span>
            <p>
              该用户没有备注~~
            </p>
            <a href="#!" class="secondary-content"><i class="mdi-action-grade"></i></a>
          </li>
        </ul>
      </div>
      <div class="col s8">
        <div class="alert alert-info">
          请选择接收人，以查看聊天消息历史
        </div>
      </div>
    </div>

    <zd-rooter></zd-rooter>
  </div>
</template>

<script>
   import { actions } from '../store/store'
    export default{

        data(){
            return{
              chatList: ""
            }
        },
        vuex: {
          actions: actions,
          getters: {
            loginName: ({ user }) => user.loginName,
            lineStatus: ({ lineStatus }) => lineStatus
          }
        },
        created: function () {
          this.$http.get(
            'http://localhost:3000/users/chatrecord/all/list/' + this.loginName,
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
              //console.log(this.chatList);
            } else {
              Materialize.toast('获取聊天列表失败', 3000);
              console.log(response.data);
            }
          }, function(response){
            Materialize.toast('获取聊天列表失败', 3000);
            console.log(response.data);
          });
        },
        methods: {
          toChat: function (username) {
            this.$router.go({name:'chatSome', params: {loginName: username}});
          }
        },
        components: {
          "nvHeader":require('../components/header.vue'),
          "zdRooter": require('../components/rooter.vue'),
          "zdCrumbs": require('../components/crumbs.vue')
        }
    }
</script>

<style scoped>
  .collection-item {
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
</style>
