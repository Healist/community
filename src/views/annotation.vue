<template>
  <nv-header></nv-header>
  <div class="container">
    <zd-crumbs></zd-crumbs>
    <ul class="collection with-header" v-show="annotations!=''">
      <li class="collection-header"><h4>全部通知</h4></li>
      <li class="collection-item" v-for="item in annotations"><div>
        <strong>{{ item.username }}</strong>
        <span v-show="item.topicTitle != null">在 “{{ item.topicTitle }}”</span>
        <span>{{ item.action | act }}了</span>
        <strong v-show="item.pubTitle != null">“{{ item.pubTitle }}”</strong>
        <strong v-show="item.author != null">{{ item.author }}</strong>
        <a href="#!" class="secondary-content" v-link="{name: 'topic', params: {title: item.topicTitle==null?item.pubTitle:item.topicTitle}}">查看</a></div></li>
    </ul>
    <div class="alert alert-info" v-show="annotations==''">
      您没有新的通知
    </div>
    <zd-rooter></zd-rooter>
  </div>
</template>

<script>
    import { actions } from '../store/store'
    export default{
        data(){
            return{
              isHasAnnotation: false,
              annotations: ""
            }
        },
        created: function () {
          //获取所有通知
          this.$http.get(
            'http://123.207.167.206:3000/users/accounts/all/annotation/'+ this.loginName,
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
              this.annotations = response.data.message;
              console.log(this.annotations);
            }
          }, function (response) {
            //回调失败
            console.log('failed!!!');
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
        vuex: {
          actions: actions,
          getters: {
            loginName: ({ user }) => user.loginName,
            lineStatus: ({ lineStatus }) => lineStatus
          }
        },
        components:{
          "nvHeader":require('../components/header.vue'),
          "zdRooter": require('../components/rooter.vue'),
          "zdCrumbs": require('../components/crumbs.vue')
        }
    }
</script>

<style scoped>
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
