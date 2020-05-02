<template>
  <div>
    Room link: {{`http://localhost:8081/#/join/${this.$route.params.roomId}`}}
    <div v-for="(value, key) in getUsernames" :key="key">
      <div>
        {{key}}
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
  data: () => ({
    userList: {},
  }),
  computed: {
    ...mapGetters([
      'getUsernamesList',
    ]),
    getUsernames() {
      return this.getUsernamesList; 
    },
  },
  beforeRouteLeave(from, to, next) {
    Vue.prototype.$socket.client.emit('disconnect-user');
    next();
  },
}
</script>

<style scoped>
</style>