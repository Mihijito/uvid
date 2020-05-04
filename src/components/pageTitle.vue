<template>
  <div id="title">
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'pageTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
#title {
  font-size: large;
  font-weight: bold;
}
</style>