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
export default {
  name: 'RoomLobby',
  data: () => ({
    roomId: '',
    username: '',
  }),
  methods: {
    joinRoom() {
      if (this.username) {
        this.$router.push({ name: 'Room', params: { roomId: this.roomId } });
      }
    }
  },
  created() {
    this.roomId = this.$route.params.roomId;
  },
}
</script>

<style scoped>
#signin-form {
  display: flex;
  flex-direction: column;
}
</style>