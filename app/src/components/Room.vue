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
  created() {
    if (this.getRoomOwner) {
      this.$socket.emit('create-room', JSON.stringify({ username: this.getRoomOwner, roomId: this.$route.params.roomId }));
    } else {
      this.$socket.emit('join-room', JSON.stringify({ username: this.username, roomId: this.roomId }));
    }
  },
  beforeRouteLeave(from, to, next) {
    Vue.prototype.$socket.disconnect();
    next();
  }
}
</script>

<style scoped>
</style>