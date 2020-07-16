<template>
  <div class="arithmetic-quiz-container container">
    <h2 class="quiz-header mb-3 py-2 row">
      <div class="col-md-6">Quiz #{{ config.id }}</div>
      <div class="col-md-6">Score: <b>{{ score }}</b></div>
    </h2>
    <div class="question-block" v-if="!showResult">
      <Question
        :timeLimit="config.timerLimit"
        :question="this.questions[this.counter]"
        @submit="submitQuestionAndProceed"
        :key="this.questions[this.counter].id"
      >
        <template v-slot:title="slotProps">{{ slotProps.index }}</template>
        <template v-slot:description="slotProps">
          {{ slotProps.expression }}
        </template>
      </Question>
    </div>
    <Result
      v-if="showResult"
      :questions="questions"
      :responses="responses"
    />
  </div>
</template>

<script type="text/javascript">
import Question from "@/components/arithmetic-quiz/Question";
import Result from "@/components/arithmetic-quiz/Result";

import { generateRandomIndex, generateRandomNumber } from "@/helpers/resource";

export default {
  name: "ArithmeticQuiz",
  components: {
    Question,
    Result,
  },
  props: {
    config: Object
  },
  data() {
    return {
      MAX_DECIMAL_PLACES: 0,
      counter: 0,
      questions: {},
      responses: {},
      score: 0,
      showResult: false,
    };
  },
  beforeMount() {
    this.setQuestion();
  },
  methods: {
    getQuestion() {
      const { minOperand, maxOperand, operators } = this.config;
      const validOperators = Object.keys(operators).filter((key) => operators[key]);
      const idx = generateRandomIndex(validOperators.length);
      const operand1 = minOperand + generateRandomNumber(
        maxOperand,
        this.MAX_DECIMAL_PLACES
      );
      const operand2 =
        1 + minOperand + generateRandomNumber(maxOperand, this.MAX_DECIMAL_PLACES);
      const expression = `${operand1} ${validOperators[idx]} ${operand2}`;
      return {
        id: ++this.counter,
        expression,
        answer: parseFloat(eval(expression).toFixed(this.MAX_DECIMAL_PLACES)),
      };
    },
    setQuestion() {
      const question = this.getQuestion();
      this.questions = {
        ...this.questions,
        [question.id]: question,
      };
    },
    submitQuestionAndProceed({ questionId, response }) {
      const { questions, counter, config: { questionCount }, setQuestion } = this;
      this.responses = {
        ...this.responses,
        [questionId]: response,
      };
      if (response == questions[questionId].answer) {
        this.score++;
      }
      if (counter >= questionCount) {
        this.showResult = true;
        return;
      }
      setQuestion();
    },
  },
};
</script>

<style type="text/css" scoped>
  .arithmetic-quiz-container {
    border: 1px solid black;
    max-width: 32%;
    margin: 1em 0.5em 1em 0;
    padding-bottom: 2em;
  }
  .quiz-header {
    background-color: #900C3F;
    color: white;
  }
</style>
