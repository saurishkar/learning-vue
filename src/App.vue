<template>
  <div id="app">
    <TabIndex />
    <TodoIndex />
  </div>
</template>

<script>
import TodoIndex from "./components/todos/Index.vue";
import TabIndex from "./components/tabs/Index.vue";

export default {
  name: 'App',
  components: {
    TodoIndex,
    TabIndex
  }
}
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
</style>
