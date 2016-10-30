<template>
  <div class="search-tag">
    <div class="row">
      <div class="col s12">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="搜索" id="tag-search" @keyup="onKeyUp | debounce 150">
          <span class="input-group-addon search-button" @click="searchByTag">
                <i class="material-icons dp48">search</i>
              </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
          <h3 class="pull-left tag-container" v-for="item in labels">
            <a v-link="{name: 'tagDetail',params: {tagName: item.tag}}">
              <span class="tag-item">{{item.tag}}</span>
              <span class="tag-topic-count" title="1">{{item.times}}</span>
            </a>
          </h3>
      </div>
    </div>
  </div>
</template>

<script>
    import { actions } from '../store/store'

    export default{
        data(){
            return{
              tags: [
                {tag:'版主的话',times:'1'},
                {tag:'炫酷简历',times:'2'},
                {tag:'软件架构',times:'4'},
                {tag:'翻墙神器',times:'2'},
                {tag:'响应式设计',times:'5'},
                {tag:'黑科技',times:'5'},
                {tag:'招聘求职',times:'2'},
                {tag:'SKILL LIST',times:'6'}
              ]
            }
        },
        vuex: {
          actions: actions,
          getters: {
            loginName: ({ user }) => user.loginName,
            lineStatus: ({ lineStatus }) => lineStatus,
            filterKey: ({ filterKey }) => filterKey
          }
        },
      created: function () {
        this.$http.get(
          'http://localhost:3000/users/tags',
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
            this.tags = response.data.message;
          }
        }, function (response) {
          //回调失败
          Materialize.toast('获取标签失败', 3000);
        });
      },
      computed: {
        labels: function () {
          //return this.tags.filter(label => label.tag.includes(this.filterKey));
          return this.tags.filter(label => label.tag.includes(this.filterKey));
        }
      },
        methods: {
          searchByTag: function () {
            var value = $('#tag-search').val();
            this.search(value);
          },
          onKeyUp: function (e) {
            this.search(e.target.value);
          }
        },
        components:{

        }
    }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Roboto","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    background-color: #fff;
  }
  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
  }
  .input-group .form-control {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    display: table-cell;
    position: relative;
    z-index: 2;
    float: left;
    margin-bottom: 0;
  }
  .form-control {
    display: block;
    width: 99%;
    height: 30px;
    padding: 5px 2px;
    padding-left: 15px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }
  .input-group-addon:last-child {
    border-left: 0;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  .input-group-addon {
    display: table-cell;
    width: 1%;
    height:30px;
    white-space: nowrap;
    vertical-align: middle;
    padding: 5px 15px;
    font-size: 14px;
    font-weight: normal;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 0;
  }
  h3{
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .pull-left {
    float: left !important;
  }
  .tag-container {
    margin-right: 1em;
    border: 1px solid #d1c4e9;
    border-radius: 10px;
    padding: 5px;
  }
  .tag-container a {
    color: #337ab7;
    text-decoration: none;
    background-color: transparent;
  }
  .tag-item {
    padding: .2em .4em .3em;
    font-size: 85%;
    text-transform: uppercase;
    color: #999;
    font-weight: 700;
    white-space: nowrap;
  }
  .tag-topic-count {
    color: white;
    padding: 0 .4em .1em;
    font-size: 85%;
    font-weight: 700;
    white-space: nowrap;
    border-left: none;
    background-color: #004d40;
    border-radius: 50%;
  }
  .search-button {
    cursor: pointer;
  }
</style>
