<template>
  <div class="question-container container">
    <h3 class="mb-3 title">
      Question #<slot name="title" :index="question.id"></slot>
    </h3>
    <Timer :count="timeLeft" v-if="timeLeft > 0" class="mb-5" />
    <h5 class="description mb-3">
      <slot name="description" :expression="question.expression"></slot>
    </h5>
    <div class="answer-container container">
      <input
        type="text"
        v-model="answer"
        class="answer form-control"
        placeholder="Your Answer"
        :disabled="!!(timeLeft == 0)"
      />
    </div>
    <button
      class="btn btn-success mt-2"
      :disabled="!(answer || timeLeft == 0)"
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
    timeLimit: Number
  },
  data() {
    return {
      timeLeft: this.timeLimit,
      answer: "",
      timerInstance: null,
    };
  },
  mounted() {
    this.setTimer();
  },
  beforeDestroy() {
    this.resetTimer();
    this.answer = "";
  },
  methods: {
    submitResponse() {
      this.$emit("submit", {
        questionId: this.question.id,
        response: this.answer,
      });
    },
    resetTimer() {
      clearInterval(this.timerInstance);
      this.timerInstance = null;
    },
    setTimer() {
      this.timerInstance = setInterval(this.updateTimer, 1000);
    },
    updateTimer(val = -1) {
      this.timeLeft += val;
      if (this.timeLeft <= 0) {
        this.resetTimer();
        this.submitResponse();
        return;
      }
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
