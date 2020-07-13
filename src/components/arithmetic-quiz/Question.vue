<template>
  <div class="question-container container">
    <h3 class="mb-3 title">
      Question #<slot name="title" :index="question.id"></slot>
    </h3>
    <Timer
      :countdown="timeLimit"
      :started="timerStarted"
      :onCountdownEnd="submitResponse"
      class="mb-5"
    />
    <h5 class="description mb-3">
      <slot name="description" :expression="question.expression"></slot>
    </h5>
    <div class="answer-container container" :key="question.id">
      <input
        type="number"
        v-model="answer"
        autofocus="true"
        class="answer form-control"
        placeholder="Your Answer"
      />
    </div>
    <button
      class="btn btn-success mt-2"
      @click="submitResponse"
    >
      Next
    </button>
  </div>
</template>

<script type="text/javascript">
import Timer from "@/components/arithmetic-quiz/Timer";

export default {
  name: "Question",
  components: {
    Timer,
  },
  props: {
    question: Object,
    submit: Function,
    timeLimit: Number,
  },
  data() {
    return {
      answer: "",
      timerStarted: false,
    };
  },
  mounted() {
    this.timerStarted = true;
  },
  beforeDestroy() {
    this.answer = "";
  },
  methods: {
    submitResponse() {
      this.$emit("submit", {
        questionId: this.question.id,
        response: this.answer,
      });
    },
  },
};
</script>

<style type="text/css" scoped>
.answer {
  max-width: 15em;
  margin: auto;
}
</style>
