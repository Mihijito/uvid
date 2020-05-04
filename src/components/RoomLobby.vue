<template>
  <div id="joinin-form">
    <page-title title="Join a room!" />
    <div>
      <input class="username-input" type="text" v-model="username" placeholder="Enter your username">
    </div>
    <div>
      <base-button :onClick="joinRoom">
        Join Room
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import baseButton from './baseButton';
import pageTitle from './pageTitle';

export default {
  name: 'RoomLobby',
  data: () => ({
    roomId: '',
    username: '',
  }),
  components: {
    baseButton,
    pageTitle,
  },
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
#joinin-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.username-input {
  margin: 3em 0;
  background-color: #eee;
  padding: 1em 3em;
  border:none;
  border-radius: 3px;
}
</style>