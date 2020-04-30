<template>
  <div>
    hoe
  </div>
</template>

<script>
export default {
  name: 'Room',
  data: () => ({
      username: '',
  }),
  methods: {
    createNewRoom() {
      if (this.username) this.$router.push({ name: 'Room' })
    }
  },
}
</script>

<style scoped>
</style>