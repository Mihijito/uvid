<template>
  <div>
    Room link: {{`http://localhost:8081/#/join/${this.$route.params.roomId}`}}
    <div v-for="username in getUsernames()" :key="username">
      <div>
        {{username}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';

export default {
  name: 'Room',
  sockets: {

  },
  methods: {
    getUsernames() {
      const usernames = Object.keys(this.getUsernamesList);
      return usernames
    }
  },
  computed: {
    ...mapGetters([
      'getRoomOwner',
      'getUsernamesList',
    ]),
  },
  beforeRouteLeave(from, to, next) {
    Vue.prototype.$socket.client.emit('disconnect-user');
    next();
  }
}
</script>

<style scoped>
</style>