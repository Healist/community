<template>
    <div class="bg-cover" v-show="showEditor" @click.self="closeEditor">
      <!-- 评论 -->
      <div class="questionbox" v-if="isComment">
        <div class="content-head">
          <span class="con-title">评论</span>
          <span class="close" @click="closeEditor"><a>X</a></span>
        </div>
        <div class="content-box">
          <form action="http://123.207.167.206:3000/api/pubArticle" method="post">
            <!-- 标题 -->
            <div class="row">
              <h3 style="font-size: 1.4rem;">正在评论“{{ topicTitle }}”</h3>
            </div>
            <!-- 文本域 -->
            <div class="input-field row">
              <textarea id="comment_content" class="materialize-textarea area" name="content" style="overflow-y:auto;max-height:200px;"></textarea>
              <label for="comment_content">评论内容</label>
            </div>

            <div class="row" style="margin-top:10px;display:block;margin-bottom:auto !important;">
              <a class="waves-effect waves-light btn right pub" style="margin-left: 2rem;" @click="closeEditor">取消</a>
              <a class="waves-effect waves-light btn right pub" @click="comment">评论</a>
            </div>
          </form>
        </div>
      </div>

      <!-- 评论的回复 -->
      <div class="questionbox" v-if="isReply">
        <div class="content-head">
          <span class="con-title">回复</span>
          <span class="close" @click="closeEditor"><a>X</a></span>
        </div>
        <div class="content-box">
          <form action="http://123.207.167.206:3000/api/pubArticle" method="post">
            <!-- 标题 -->
            <div class="row">
              <h3 style="font-size: 1.4rem;">正在回复@{{ toUsername }}</h3>
            </div>
            <!-- 文本域 -->
            <div class="input-field row">
              <textarea id="reply_content" class="materialize-textarea area" name="content" style="overflow-y:auto;max-height:200px;"></textarea>
              <label for="reply_content">回复内容</label>
            </div>

            <div class="row" style="margin-top:10px;display:block;margin-bottom:auto !important;">
              <a class="waves-effect waves-light btn right pub" style="margin-left: 2rem;" @click="closeEditor">取消</a>
              <a class="waves-effect waves-light btn right pub" @click="reply">回复</a>
            </div>
          </form>
        </div>
      </div>

      <!-- 正常的发布 -->
      <div class="questionbox" v-show="!isReply && !isComment">
        <div class="content-head">
          <span class="con-title">发布</span>
          <span class="close" @click="closeEditor"><a>X</a></span>
        </div>
        <div class="content-box">
          <form action="http://123.207.167.206:3000/api/pubArticle" method="post">
            <!-- 标题 -->
            <div class="input-field row">
              <input id="article_title" type="text" class="validate" name="title">
              <label for="article_title">写下你的标题</label>
            </div>
            <!-- 文本域 -->
            <div class="input-field row">
              <textarea id="article_content" class="materialize-textarea area" name="content" style="overflow-y:auto;max-height:200px;"></textarea>
              <label for="article_content">文章内容</label>
            </div>
            <!-- 标签 -->
            <div class="input-field row">
              <input id="article_label" type="text" class="validate" name="label">
              <label for="article_label">给你的文章打标签（选填，如：前端）</label>
            </div>
            <!-- 选择框 -->
            <label>选择类别</label>
            <select id="article_type" class="browser-default" name="typeof">
              <option value="" disabled selected>选择文章所属板块</option>
              <option value="程序猿精英圈">程序猿精英圈</option>
              <option value="互动讨论区">互动讨论区</option>
              <option value="问答专区">问答专区</option>
              <option value="大神私房菜BLOG">大神私房菜BLOG</option>
              <option value="招聘&求职专区">招聘&求职专区</option>
              <option value="干货,精华专区">干货,精华专区</option>
            </select>

            <div class="row" style="margin-top:10px;display:block;margin-bottom:auto !important;">
              <a class="waves-effect waves-light btn right pub" style="margin-left: 2rem;" @click="closeEditor">取消</a>
              <a class="waves-effect waves-light btn right pub" @click="pubArticle">发布</a>
            </div>
          </form>
        </div>
      </div>

    </div>

</template>

<script>
  import { actions } from '../store/store';

  export default{
    data(){
      return{

      }
    },
    props: ['showEditor', 'isComment', 'topicTitle','topicType', 'isReply','toUsername'],
    components:{

    },
    vuex: {
      actions: actions,
      getters: {
        loginName: ({ user }) => user.loginName,
        lineStatus: ({ lineStatus }) => lineStatus,
        isUpdateTitle: ({ isUpdateTitle }) => isUpdateTitle,
        isUpdateTopic: ({ isUpdateTopic }) => isUpdateTopic
      }
    },
    methods: {
      closeEditor: function () {
        this.showEditor = false;
      },
      pubArticle: function () {
        var article_title = $('#article_title') .val();
        var article_content = $('#article_content').val();
        var article_type = $('#article_type').val();
        var loginName = this.loginName;
        //选填标签选项
        var article_label = $('#article_label').val();

        if(article_title=="" || article_content=="" || article_type=="") {
          Materialize.toast('表单有空值', 3000);
          return;
        }
        this.$http.post(
          'http://123.207.167.206:3000/users/pubArticle',
          {
            title: article_title,
            content: article_content,
            type: article_type,
            label: article_label,
            loginName: loginName
          },
          {
            'headers': {
              "X-Requested-With": "XMLHttpRequest"
            },
            emulateJSON: true,
            crossOrigin: true
          }
        ).then(function (response) {
          if(response.ok) {
            Materialize.toast('发布成功', 3000);
            this.showEditor = false;
            $('#article_title') .val("");
            $('#article_content') .val("");
            $('#article_type') .val("");
            //通知category组件去更新界面
            this.setUpdateTitle(true);
          }
        }, function (response) {
          Materialize.toast('发布失败', 3000);
        });

        //触发通知,通知粉丝本人发布了文章
        this.$http.post(
          'http://123.207.167.206:3000/users/annotation',
          {
            title: article_title,
            type: article_type,
            loginName: loginName,
            action: 'public'
          },
          {
            'headers': {
              "X-Requested-With": "XMLHttpRequest"
            },
            emulateJSON: true,
            crossOrigin: true
          }
        ).then(function (response) {
          if(response.ok) {
            Materialize.toast('通知成功', 3000);
          }
        }, function (response) {
          Materialize.toast('通知失败', 3000);
        });

      },
      comment: function () {
        var comment_content = $('#comment_content').val();

        if(comment_content == "") {
          Materialize.toast('表单有空值', 3000);
          return;
        }

        this.$http.post(
          'http://123.207.167.206:3000/users/topic/comment',
          {
            title: this.topicTitle,
            content: comment_content,
            loginName: this.loginName
          },
          {
            'headers': {
              "X-Requested-With": "XMLHttpRequest"
            },
            emulateJSON: true,
            crossOrigin: true
          }
        ).then(function (response) {
          if(response.ok) {
            Materialize.toast('评论成功', 3000);
            this.showEditor = false;
            $('#comment_content') .val("");
            //通知topic组件去更新界面
            this.setUpdateTopic(true);
          }
        }, function (response) {
          Materialize.toast('评论失败', 3000);
        });

        //触发通知,通知关注本片文章的用户
        this.$http.post(
          'http://123.207.167.206:3000/users/focustopic/annotation',
          {
            title: this.topicTitle,
            type: this.topicType,
            loginName: this.loginName,
            action: 'comment'
          },
          {
            'headers': {
              "X-Requested-With": "XMLHttpRequest"
            },
            emulateJSON: true,
            crossOrigin: true
          }
        ).then(function (response) {
          if(response.ok) {
            Materialize.toast('通知成功', 3000);
          }
        }, function (response) {
          Materialize.toast('通知关注者失败', 3000);
        });

        //触发通知,通知粉丝本人评论了文章
        this.$http.post(
          'http://123.207.167.206:3000/users/annotation',
          {
            title: this.topicTitle,
            type: this.topicType,
            loginName: this.loginName,
            action: 'comment'
          },
          {
            'headers': {
              "X-Requested-With": "XMLHttpRequest"
            },
            emulateJSON: true,
            crossOrigin: true
          }
        ).then(function (response) {
          if(response.ok) {
            Materialize.toast('通知成功', 3000);
          }
        }, function (response) {
          Materialize.toast('通知失败', 3000);
        });
      },
      reply: function () {
        var comment_content = $('#reply_content').val();

        if(comment_content == "") {
          Materialize.toast('表单有空值', 3000);
          return;
        }

        this.$http.post(
          'http://123.207.167.206:3000/users/topic/reply',
          {
            title: this.topicTitle,
            content: comment_content,
            loginName: this.loginName,
            author: this.toUsername
          },
          {
            'headers': {
              "X-Requested-With": "XMLHttpRequest"
            },
            emulateJSON: true,
            crossOrigin: true
          }
        ).then(function (response) {
          if(response.ok) {
            Materialize.toast('回复成功', 3000);
            this.showEditor = false;
            $('#reply_content') .val("");
            //通知topic组件去更新界面
            this.setUpdateTopic(true);
          }
        }, function (response) {
          Materialize.toast('回复失败', 3000);
        });

        //触发通知,通知粉丝本人发布了文章
        this.$http.post(
          'http://123.207.167.206:3000/users/annotation/reply',
          {
            title: this.topicTitle,
            loginName: this.loginName,
            author: this.toUsername,
            action: 'reply'
          },
          {
            'headers': {
              "X-Requested-With": "XMLHttpRequest"
            },
            emulateJSON: true,
            crossOrigin: true
          }
        ).then(function (response) {
          if(response.ok) {
            Materialize.toast('通知成功', 3000);
          }
        }, function (response) {
          Materialize.toast('通知失败', 3000);
        });

      }
    }
  }
</script>

<style>
    *{
      box-sizing: border-box;
    }
  .bg-cover {
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 7;
    transition: 2s;
  }
  .questionbox {
    position: relative;
    width:550px;
    min-height: 400px;
    margin:5rem auto;
    background-color: #fff;
    z-index: 10;
    border-radius: 10px;
  }
  .content-head {
    width: 100%;
    height:40px;
    background: #1D7FE2;
    padding: 6px 30px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  .content-box{
    padding: 0 15px;
    margin: 30px 20px;
    height:auto;
  }
  .con-title {
    font-size: 1.4rem;
    color: #fff;
  }
  .close {
    float: right;
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    text-align: center;
    line-height: 1.5rem;
    cursor: pointer;
  }
  .pub {
    margin:1rem;
  }
  .area {
    overflow-y: auto;
    max-height: 100px !important;
    height: 90px !important;
  }
</style>

