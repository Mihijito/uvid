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
  methods: {
    ...mapActions([
      'setClientOwner',
      'setRoomId',
    ]),
    joinRoom() {
      if (this.username && this.roomId) {
        this.setClientOwner(this.username);
        this.setRoomId(this.roomId);
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