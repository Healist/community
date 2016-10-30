import Vue from 'vue'
import Router from 'vue-router'
import routerMap from './routers'
import vueResource from 'vue-resource'
import store from './store/store'

Vue.use(vueResource);
Vue.use(Router);

let router = new Router({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
});

let app = Vue.extend({
  store: store
});

routerMap(router);

router.start(app,"#app");
