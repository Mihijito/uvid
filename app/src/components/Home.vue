<template>
  <div id="signin-form">
    <div>
        <input type="text" v-model="username" placeholder="Enter your username">
    </div>
    <div>
        <button v-on:click="createNewRoom">
          Create room
        </button>
    </div>
  </div>
</template>

<script>
import generateId from '../roomIdGenerator/idGenerator';

export default {
  name: 'Home',
  data: () => ({
      username: '',

  }),
  methods: {
    createNewRoom() {
      if (this.username) {
        const roomId = generateId();
        this.$router.push({ name: 'Room', params: { roomId } });
      }
    }
  },
}
</script>

<style scoped>
#signin-form {
  display: flex;
  flex-direction: column;
}
</style>
