/**
 * Created by Healist on 2016/9/20.
 */
export  default function (router) {
  router.map({
    /* 首页 */
    '/': {
      name:'home',
      component: function (resolve) {
        //noinspection JSUnresolvedFunction
        require(['./views/index.vue'], resolve);
      }
    },

    /* 404 (暂时控制跳转到首页)*/
    '/*': {
      component: function (resolve) {
        require(['./views/index.vue'], resolve);
      }
    },

    /* 详情页 */
    '/topic/:title': {
      name: 'topic',
      component: function (resolve) {
        require(['./views/topic.vue'], resolve);
      }
    },

    /* 用户信息 */
    '/user/:loginName': {
      name: 'user',
      component: function (resolve) {
        require(['./views/user.vue'], resolve);
      }
    },

    /* 该用户也关注的人 */
    'user/:loginName/following': {
      name: 'userFollowing',
      component: function (resolve) {
        require(['./views/userFollowing.vue'], resolve);
      }
    },

    /* 关注该用户的人 */
    'user/:loginName/followers': {
      name: 'userFollower',
      component: function (resolve) {
        require(['./views/userFollower.vue'], resolve);
      }
    },

    /* 该用户也关注的人 */
    'user/:loginName/edit': {
      name: 'userEdit',
      component: function (resolve) {
        require(['./views/userEdit.vue'], resolve);
      }
    },

    /* 登陆 */
    '/login': {
      name: 'login',
      component: function (resolve) {
        require(['./views/login.vue'], resolve);
      }
    },

    /* 注册 */
    '/register': {
      name: 'register',
      component: function (resolve) {
        require(['./views/register.vue'], resolve);
      }
    },

    /* categorie */
    '/categorie': {
      name: 'categorie',
      component: function (resolve) {
        require(['./views/categorie.vue'], resolve);
      }
    },

    '/categorie/:categoryTitle': {
      name: 'cate',
      component: function (resolve) {
        require(['./views/cate.vue'], resolve);
      }
    },

    /* member */
    '/member': {
      name: 'member',
      component: function (resolve) {
        require(['./views/member.vue'], resolve);
      }
    },

    /* recent */
    '/recent': {
      name: 'recent',
      component: function (resolve) {
        require(['./views/recent.vue'],resolve);
      }
    },

    /* tags */
    '/tags': {
      name: 'tags',
      component: function (resolve) {
        require(['./views/tags.vue'],resolve);
      }
    },

    /* popular */
    '/popular': {
      name: 'popular',
      component: function (resolve) {
        require(['./views/populars.vue'],resolve);
      }
    },

    /* groups */
    '/groups': {
      name: 'groups',
      component: function (resolve) {
        require(['./views/groups.vue'], resolve);
      }
    },

    /* chat */
    '/chat': {
      name: 'chat',
      component: function (resolve) {
        require(['./views/chat.vue'], resolve);
      }
    },

    /* chat with somebody */
    '/chat/:loginName': {
      name: 'chatSome',
      component: function (resolve) {
        require(['./views/chatSome.vue'], resolve);
      }
    },

    /* annotation */
    '/annotation': {
      name: 'annotation',
      component: function (resolve) {
        require(['./views/annotation.vue'],resolve);
      }
    },

    /* 发布 */
    '/public': {
      name: 'public',
      component: function (resolve) {
        require(['./views/public.vue'],resolve);
      }
    },

    /* 标签详情页 */
    '/tags/:tagName': {
      name: 'tagDetail',
      component: function (resolve) {
        require(['./views/tagDetail.vue'], resolve);
      }
    },

    /* ueditor */
    '/ueditor': {
      name: 'ueditor',
      component: function (resolve) {
        require(['./views/ueditor.vue'],resolve);
      }
    },

    '/:moudle/daily': {
      name: 'daily',
      component:function (resolve) {
        require(['./views/daily.vue'],resolve);
      }
    },

    '/:moudle/weekly': {
      name: 'weekly',
      component:function (resolve) {
        require(['./views/weekly.vue'],resolve);
      }
    },

    '/:moudle/monthly': {
      name: 'monthly',
      component:function (resolve) {
        require(['./views/monthly.vue'],resolve);
      }
    }

  });
}
