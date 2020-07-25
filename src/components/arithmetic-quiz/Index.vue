<template>
  <div class="arithmetic-quiz-generator container">
    <h1 class="text-center mb-5">Timed Arithmetic Quiz</h1>
    <div class="instructions" v-if="!started">
      <p>
        You will be asked a set of
        <b class="text-primary">{{ questionCount }} questions</b>.
        Each question will have a time limit to answer within
        <b class="text-danger">{{ timerLimit }} seconds</b>.
      </p>
      <p>
        At the end of the test, you will be able to see the final score
        alongwith list of right, wrong and not attempted questions.
      </p>
      <button class="btn btn-success mt-5" @click="startQuiz">Start</button>
    </div>
    <Quiz :config="quiz" v-if="started" />
  </div>
</template>

<script type="text/javascript">
import Quiz from "@/components/arithmetic-quiz/Quiz";

import { operators as arithOps } from "@/constants/defaults";

const defaultValues = Object.freeze({
  minOperand: 10,
  maxOperand: 20,
  questionCount: 20,
  timerLimit: 10,
  operators: Object.values(arithOps).reduce((acc, op) => {
    return { ...acc, [op.id]: {
      ...op,
      checked: true
    }};
  }, {})
});

export default {
  name: "ArithmeticQuiz",
  components: {
    Quiz
  },
  data() {
    return {
      questionCount: defaultValues.questionCount,
      timerLimit: defaultValues.timerLimit,
      quiz: {
        id: 1,
        ...defaultValues
      },
      started: false
    };
  },
  methods: {
    startQuiz() {
      this.started = true;
    },
  },
};
</script>

<style type="text/css" scoped>
  .arithmetic-quiz {
    width: 100%;
    text-align: center;
    justify-content: center;
    margin: auto;
  }
</style>
