<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <div class="title">{{ todo.title }}</div>
    <div v-if="todo.completed" class="status">Completed</div>
    <div v-else class="status">Pending</div>
  </div>
</template>

<script>
export default {
  name: "TodoShow",
  props: ["todo"],
};
</script>

<style scoped type="text/css">
.todo-item {
  margin: 20px 10px;
  text-align: left;
  border: 1px solid grey;
  padding: 10px;
  background-color: #f4d03f;
}
.todo-item.completed {
  background-color: #28b463;
  color: white;
}
.status {
  font-weight: bold;
}
</style>
