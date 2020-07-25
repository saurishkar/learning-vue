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
        @submit="evalResponseAndProceed"
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
import { evalExp } from "@/helpers/math";

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
    getAnswerForQues(questionId) {
      const { operand1, operand2, operator } = this.questions[questionId];
      const answerToQues = parseFloat(evalExp({ operand1, operand2, operator }).toFixed(2));
      return answerToQues;
    },
    getQuestion() {
      const { minOperand, maxOperand, operators } = this.config;
      const validOperators = Object.values(operators).filter((op) => op.checked);
      const idx = generateRandomIndex(validOperators.length);
      const operand1 = minOperand + generateRandomNumber(
        maxOperand - minOperand,
        this.MAX_DECIMAL_PLACES
      );
      const operand2 =
        1 + minOperand + generateRandomNumber(maxOperand - minOperand, this.MAX_DECIMAL_PLACES);
      const expression = `${operand1} ${validOperators[idx].symbol} ${operand2}`;
      const quesAttr = {
        operand1,
        operand2,
        operator: validOperators[idx].id,
        expression
      };
      return {
        id: ++this.counter,
        ...quesAttr
      };
    },
    incScore() {
      this.score++;
    },
    setAnswerForQues(questionId, answer) {
      this.questions[questionId].answer = answer;
    },
    setQuestion() {
      const question = this.getQuestion();
      this.questions = {
        ...this.questions,
        [question.id]: question,
      };
    },
    setResponse(questionId, response) {
      this.responses = { ...this.responses, [questionId]: response };
    },
    evalResponseAndProceed({ questionId, response }) {
      const { counter, config: { questionCount }, setQuestion } = this;
      const answer = this.getAnswerForQues(questionId);
      this.setAnswerForQues(questionId, answer);
      this.setResponse(questionId, response);
      if (response == answer) {
        this.incScore();
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
    max-width: 100%;
    margin: 1em 0.5em 1em 0;
    padding-bottom: 2em;
  }
  .quiz-header {
    background-color: #900C3F;
    color: white;
  }
</style>
