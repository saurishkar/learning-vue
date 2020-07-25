<template>
  <div class="result-container">
    <table class="table">
      <thead class="alert alert-primary">
        <th>ID</th>
        <th style="width: 50%">Question</th>
        <th>Correct Answer</th>
        <th>Your Response</th>
      </thead>
      <tbody>
        <tr
          v-for="question in questions"
          :key="question.id"
          :class="rowClass(question)"
        >
          <td>{{ question.id }}</td>
          <td>{{ question.expression }}</td>
          <td>{{ question.answer }}</td>
          <td>{{ responses[question.id] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Result",
  props: {
    questions: Object,
    responses: Object,
  },
  methods: {
    rowClass({ answer, id }) {
      if (answer == this.responses[id]) {
        return "alert alert-success";
      } else if (this.responses[id] && answer != this.responses[id]) {
        return "alert alert-danger";
      } else return "alert alert-secondary";
    },
  },
};
</script>
