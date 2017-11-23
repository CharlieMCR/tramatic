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
    footer {
        text-align: right;
        padding: .25rem 1rem;
        font-size: 0.8rem;
    }
    a {
        text-decoration: none;
        color: #666;
    }
</style>