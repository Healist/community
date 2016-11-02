/**
 * Created by Healist on 2016/9/30.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//noinspection JSUnresolvedFunction
const store = new Vuex.Store({
  state: {
    // 当前用户
    user: {
      loginName: localStorage.getItem('loginName'),
      avatar_url: ''
    },
    annotationBox: false,
    chatBox: false,
    userInfoBox: false,
    showEditor: false,
    lineStatus: 1,
    //是否需要更新文章列表
    isUpdateTitle: false,
    //是否需要更新topic详情页
    isUpdateTopic: false,
    // 过滤出只包含这个key的会话
    filterKey: ''
  },
  mutations: {
    INIT_DATA (state) {

    },
    // 搜索
    SET_FILTER_KEY (state, value) {
      state.filterKey = value;
    },
    SET_STATUS (state, value) {
      state.lineStatus = value;
    },
    SET_UPDATE_TITLE (state, value) {
      state.isUpdateTitle = value;
    },
    SET_UPDATE_TOPIC(state, value) {
      state.isUpdateTopic = value;
    },
    SET_ANNOTATION_BOX(state, value) {
      state.annotationBox = value;
    },
    SET_CHAT_BOX(state, value) {
      state.chatBox = value;
    },
    SET_USER_INFO_BOX(state, value) {
      state.userInfoBox = value;
    }
  }
});

store.watch(
  (state) => state.sessions,
  (val) => {
    console.log('CHANGE: ', val);
  },
  {
    deep: true
  }
);

export default store;
export const actions = {
  initData: ({ dispatch }) => dispatch('INIT_DATA'),
  search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value),
  setUpdateTitle: ({ dispatch }, value) => dispatch('SET_UPDATE_TITLE', value),
  setUpdateTopic: ({ dispatch }, value) => dispatch('SET_UPDATE_TOPIC', value),
  setAnnotationBox: ({ dispatch }, value) => dispatch('SET_ANNOTATION_BOX', value),
  setChatBox: ({ dispatch }, value) => dispatch('SET_CHAT_BOX', value),
  setUserInfoBox: ({ dispatch }, value) => dispatch('SET_USER_INFO_BOX', value),
  setStatus: function (store, value) {
    this.$http.post(
      'http://123.207.167.206:3000/users/linestatus',
      {
        username: store.state.user.loginName,
        linestatus: value
      },
      {
        'headers': {
          "X-Requested-With": "XMLHttpRequest"
        },
        emulateJSON: true,
        crossOrigin: true
      }
    ).then(function (response) {
      //成功回调
      if(response.ok) {
        console.log("修改在线状态成功！");
        store.dispatch('SET_STATUS', value);
      }
    }, function (response) {
      //回调失败
      console.log("failed!!!");
    });
  }
};
