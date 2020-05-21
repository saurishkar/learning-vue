<template>
  <div id="app">
    <Navbar />
    <div class="page-content"><Router /></div>
  </div>
</template>

<script>
import Router from "./Router.vue";
import Navbar from "./components/nav/Navbar.vue";

export default {
  name: "App",
  components: {
    Router,
    Navbar
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.page-content {
  margin-top: 5em;
}
</style>
