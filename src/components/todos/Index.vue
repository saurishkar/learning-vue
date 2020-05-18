<template>
  <div class="home">
    <h1>My todos</h1>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id">
        <TodoShow v-bind:todo="todo" />
      </li>
    </ul>
  </div>
</template>

<script>

import TODOS from "../../constants/todos.json";
import TodoShow from "./Show";

export default {
  name: 'TodoIndex',
  components: {
    TodoShow
  },
  data: function() {
    return {
      todos: TODOS,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
}
a {
  color: #42b983;
}
</style>
