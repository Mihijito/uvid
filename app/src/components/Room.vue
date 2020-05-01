<template>
  <div>
    Room link: {{`http://localhost:8081/#/join/${this.$route.params.roomId}`}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';

export default {
  name: 'Room',
  sockets: {

  },
  computed: {
    ...mapGetters([
      'getRoomOwner',
    ]),
  },
  beforeRouteLeave(from, to, next) {
    Vue.prototype.$socket.emit('disconnect-user');
    next();
  }
}
</script>

<style scoped>
</style>