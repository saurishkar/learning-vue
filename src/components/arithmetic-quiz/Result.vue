<template>
  <div class="result-container container">
    <h1 class="mb-4">Score: <b class="text-primary">{{ score }}</b></h1>
    <table class="table">
      <thead class="alert alert-primary">
        <th>ID</th>
        <th>Question</th>
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
    score: Number,
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
