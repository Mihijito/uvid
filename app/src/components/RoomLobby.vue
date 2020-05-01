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
import openSocket from "socket.io-client";
export default {
  name: 'RoomLobby',
  data: () => ({
    roomId: '',
    username: '',
  }),
  methods: {
    joinRoom() {
      if (this.username) this.$router.push({ name: 'Room', params: { roomId: this.roomId } })
    }
  },
  created() {
    this.roomId = this.$route.params.roomId;
  },
  mounted() {
    const socket = openSocket.connect('http://localhost:8080');
    socket.emit('connection');
    socket.emit('create-room', JSON.stringify({ username: this.username, roomId: this.roomId }));
  }
}
</script>

<style scoped>
#signin-form {
  display: flex;
  flex-direction: column;
}
</style>