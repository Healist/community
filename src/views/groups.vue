<template>
  <nv-header></nv-header>
  <div class="container">
    <zd-crumbs></zd-crumbs>

    <div class="row" >
      <div class="col s12">
        <div class="row">
          <div class="left col s5">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="搜索" >
              <span class="input-group-addon search-button">
                <i class="material-icons dp48">search</i>
              </span>
            </div>
          </div>
          <div class="left col s3 offset-s4 form-control2">
            <select>
              <option value="alpha">小组名</option>
              <option value="count">小组成员数</option>
              <option value="date">创建时间</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col s4" v-for="item in items">
        <div class="panel panel-default">
          <div class="panel-heading list-cover">
            <h3 class="panel-title">
              {{item.msg}}
              <small>{{item.word}}</small>
            </h3>
          </div>
          <div class="panel-body">
            <ul class="members">
              <li><a href="#"><img src="../assets/3.png" title="Healist"></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default{
        data(){
            return{
              items:[
                {msg:'Administrators',word:'1',persons:[]},
                {msg:'最强王者',word:'1',persons:[]},
                {msg:'大师',word:'1',persons:[]},
                {msg:'钻石',word:'1',persons:[]},
                {msg:'白金',word:'1',persons:[]},
                {msg:'黄金',word:'1',persons:[]},
                {msg:'白银',word:'1',persons:[]},
                {msg:'青铜',word:'1',persons:[]}
              ]
            }
        },
        components:{
          "nvHeader":require('../components/header.vue'),
          "zdCrumbs": require('../components/crumbs.vue')
        }
    }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  ul{
    margin-top: 0;
    margin-bottom: 10px;
  }
  a {
    color: #337ab7;
    text-decoration: none;
  }
  h3 {
    font-size: 24px;
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
  select {
    text-transform: none;
    color: inherit;
    font: inherit;
    margin: 0;
    display: block !important;
  }
  .form-control2{
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
  }
  .panel-default {
    border-color: #ddd;
  }
  .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 0;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.05);
    box-shadow: 0 1px 1px rgba(0,0,0,0.05);
  }
  .list-cover {
    background-image: url(../assets/cover-default.png);;
    background-size: cover;
    min-height: 125px;
    background-position: 50% 50%;
    cursor: pointer;
  }
  .panel-heading {
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
  }
  .panel-body {
    min-height: 72px;
    padding: 15px;
  }
  .members {
    padding-left: 0;
  }
  .members>li {
    list-style-type: none;
    display: inline-block;
  }

  .members>li img{
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 1.5rem;
    line-height: normal;
  }
  .list-cover h3 {
    background-color: rgba(0,0,0,0.5);
    display: inline-block;
    padding: .25em .5em;
    color: white;
    font-weight: bold;
    text-transform: capitalize;
  }
  .panel-title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 16px;
    color: inherit;
  }
</style>
