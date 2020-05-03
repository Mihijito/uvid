<template>
  <button @click="onClick" id="button">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'baseButton',
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>
<style scoped>

#button {
  border: none;
  background-color: #eee;
  width: 10em;
  padding: 1em 0;
  border-radius: 5px;
}
</style>