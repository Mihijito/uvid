<template>
  <div id="signin-form">
    <page-title title="Welcome to UVID!" />
    <div>
      <input class="username-input" type="text" v-model="username" placeholder="Enter your username">
    </div>
    <div>
      <base-button :onClick="createNewRoom">
        Create room
      </base-button>
    </div>
  </div>
</template>

<script>
import generateId from '../roomIdGenerator/idGenerator';
import { mapActions } from 'vuex';
import baseButton from './baseButton';
import pageTitle from './pageTitle';

export default {
  name: 'Home',
  data: () => ({
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
    async createNewRoom() {
      if (this.username) {
        const roomId = await generateId();

        this.setClientOwner(this.username);
        this.setRoomId(roomId);
        this.$socket.client.emit('create-room', JSON.stringify({ username: this.username, roomId }));
        this.$router.push({ name: 'Room', params: { roomId } });
      }
    },
  },
}
</script>

<style scoped>
#signin-form {
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
