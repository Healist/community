<template>
    <div class="row">
      <div class="col s12">
        <footer id="footer" class="container footer">
          <div class="copyright">
            Copyright © 2016
            <a href="http://weibo.com/lnzhangda" target="_blank">Healist</a>
            &nbsp;|&nbsp;
            <a href="#" target="_blank">技术分享社区</a>
          </div>
        </footer>
      </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }
</script>

<style scoped>
  .footer {
    text-align: center;
    margin-top: 1em;
    -webkit-transition: opacity 200ms linear;
    -moz-transition: opacity 200ms linear;
    -ms-transition: opacity 200ms linear;
    -o-transition: opacity 200ms linear;
    transition: opacity 200ms linear;
  }
  .footer .copyright {
    padding-bottom: 10px;
  }
</style>
