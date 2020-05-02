<template>
  <div class="signin-form">
    <div>
      <input type="text" v-model="username" placeholder="Enter your username">
    </div>
    <div>
      <button v-on:click="joinRoom">
        Join Room
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'RoomLobby',
  data: () => ({
    roomId: '',
    username: '',
  }),
  sockets: {
    userJoined(username) {
      this.$socket.client.emit('call-request',username)
    }
  },
  methods: {
    ...mapActions([
      'setClientOwner',
    ]),
    joinRoom() {
      if (this.username && this.roomId) {
        this.setClientOwner(this.username);
        this.$socket.client.emit('join-room', JSON.stringify({ username: this.username, roomId: this.roomId }));
        this.$router.push({ name: 'Room', params: { roomId: this.roomId } });
      }
    }
  },
  created() {
    this.roomId = this.$route.params.roomId;
  }
}
</script>

<style scoped>
#signin-form {
  display: flex;
  flex-direction: column;
}
</style>