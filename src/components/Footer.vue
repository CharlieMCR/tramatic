<template>
    <footer>
        <a href="https://github.com/CharlieMCR/tramatic/releases" target="_blank">Version {{ version }}</a>
    </footer>
</template>

<script>
  /* global VERSION:true */
  /* eslint no-undef: "error" */
  export default {
    name: 'Footer',
    data () {
      return {
        version: VERSION
      }
    }
  }
</script>

<style>
</style>