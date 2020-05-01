import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueSocketIOExt from 'vue-socket.io-extended';
import routes from './router/routes';
import store from './store';
import io from 'socket.io-client';

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({ routes });

const socket = io('http://localhost:8080');
Vue.use(VueSocketIOExt, socket, { store });

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
