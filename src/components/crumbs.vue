<template>
    <ol class="breadcrumb">
      <li><a v-link="{name:'home'}">
        <span>主页</span>
      </a></li>
      <li class="active">
        &nbsp;/&nbsp;
        <span v-show="!isThree">{{ path_one }}</span>
        <a v-link="{name: 'user', params: {loginName: accountName}}" v-show="isThree && isEdit"><span>
          {{ accountName }}
        </span></a>
        <a v-link="{name: 'cate', params: {categoryTitle: topicType}}" v-show="isThree && isTopic"><span>
          {{ topicType }}
        </span></a>
        <a v-link="{name: 'tags'}" v-show="isThree && isTag"><span>
          话题
        </span></a>
        <a v-link="{name: 'chat'}" v-show="isThree && isChatRoom"><span>
          聊天
        </span></a>
        <span v-show="isThree">/</span>
        <span>{{ path_two }}</span>
      </li>
    </ol>
</template>

<script>
    export default{
        props: ['topicType'],
        data(){
            return{
              path: this.$route.path,
              accountName: this.$route.params.loginName,
              path_one: "",
              path_two: "",
              crumb: "主题",
              isThree: false,
              isTopic: false,
              isEdit: false,
              isTag: false,
              isChatRoom: false
            }
        },
        watch: {
          'topicType': function () {
            this.path_one = this.topicType;
          }
        },
        ready: function () {
          let arr = this.path.split("/");
          let length = arr.length;

          if(arr[1] == "categorie") {
            this.path_one = "版面";
            if(length>2 && arr[2] != "") {
              this.path_one = decodeURI(arr[2]);
            }
          } else if(arr[1] == "recent"){
            this.path_one = "最新";
          } else if(arr[1] == "register"){
            this.path_one = "注册";
          } else if(arr[1] == "login"){
            this.path_one = "登陆";
          } else if(arr[1] == "tags") {
            this.path_one = "话题";
            if(length>2 && arr[2]!="") {
              this.isTag = true;
              this.isThree = true;
              this.path_two = decodeURI(arr[2]);
            }
          } else if(arr[1] == "popular") {
            this.path_one = "热门";
          } else if(arr[1] == "member") {
            this.path_one = "会员";
          } else if(arr[1] == "groups") {
            this.path_one = "小组";
          } else if(arr[1] == "annotation") {
            this.path_one = "通知";
          } else if(arr[1] == "chat") {
            this.path_one = "聊天";
            if(length>2 && arr[2] != "") {
              this.isChatRoom = true;
              this.isThree = true;
              this.path_two = this.$route.params.loginName;
            }
          } else if(arr[1] == "user") {
            this.path_one = arr[2];
            if(/[a-zA-Z]+/.test(arr[2]) && arr[3]=='edit') {
              this.isThree = true;
              this.isEdit = true;
              this.path_two = "编辑";
            } else if(/[a-zA-Z]+/.test(arr[2]) && arr[3]=='following') {
              this.isThree = true;
              this.isEdit = true;
              this.path_two = "关注";
            } else if(/[a-zA-Z]+/.test(arr[2]) && arr[3]=='followers') {
              this.isThree = true;
              this.isEdit = true;
              this.path_two = "粉丝";
            }
          } else if(arr[1] == "topic") {
            this.path_one = this.crumb;
            this.isThree = true;
            this.isTopic = true;
            this.path_two = decodeURI(arr[2]);
          } else {
            this.path_one = "待录入";
          }
        },
        components:{

        }
    }
</script>

<style scoped>
  .breadcrumb {
    font-size: 16px;
    background: none;
    padding: 8px 15px;
    list-style: none;
    border-radius: 0;
  }
  .breadcrumb li {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }
  .breadcrumb>.active {
    color: #777;
  }
</style>
