import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueSocketIO from 'vue-socket.io';
import routes from './router/routes';
import store from './store';

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({ routes });

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8080',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
