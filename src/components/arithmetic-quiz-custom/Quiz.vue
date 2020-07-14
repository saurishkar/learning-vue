<template>
  <div class="arithmetic-quiz-container container">
    <div class="question-block" v-if="counter > 0 && !showResult">
      <Question
        :timeLimit="timerLimit"
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
      :score="score"
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
    timerLimit: Number,
    maxOperand: Number,
    minOperand: Number,
    questionCount: Number,
    operators: Array
  },
  data() {
    return {
      // OPERATORS: ["+", "-", "*", "/"],
      // NUMBER_OF_QUESTIONS: 20,
      // TIMER_LIMIT: 20,
      // MAX_NUMBER: 20,
      MAX_DECIMAL_PLACES: 2,
      counter: 0,
      questions: {},
      responses: {},
      score: 0,
      showResult: false,
    };
  },
  methods: {
    getQuestion() {
      const idx = generateRandomIndex(4);
      const operand1 = this.minOperand + generateRandomNumber(
        this.maxOperand,
        this.MAX_DECIMAL_PLACES
      );
      const operand2 =
        1 + this.minOperand + generateRandomNumber(this.maxOperand, this.MAX_DECIMAL_PLACES);
      const expression = `${operand1} ${this.operators[idx]} ${operand2}`;
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
      this.responses = {
        ...this.responses,
        [questionId]: response,
      };
      if (response == this.questions[questionId].answer) {
        this.score++;
      }
      if (this.counter >= this.questionCount) {
        this.showResult = true;
        return;
      }
      this.setQuestion();
    },
  },
};
</script>
