<template>
  <div id="app">
    <h1>Tramatic</h1>
    <router-view/>
    <site-footer></site-footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer'
  export default {
    name: 'app',
    components: {
      'site-footer': Footer
    }
  }
</script>

<style>
  @import "~normalize.css";

  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
