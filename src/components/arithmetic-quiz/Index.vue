<template>
  <div class="arithmetic-quiz-container container">
    <h1 class="text-center mb-5">Timed Arithmetic Quiz</h1>
    <div class="instructions" v-if="counter == 0 && !showResult">
      <p>
        You will be asked a set of
        <b class="text-primary">{{ this.NUMBER_OF_QUESTIONS }} questions</b>.
        Each question will have a time limit to answer within
        <b class="text-danger">{{ this.TIMER_LIMIT }} seconds</b>.
      </p>
      <p>
        At the end of the test, you will be able to see the final score
        alongwith list of right, wrong and not attempted questions.
      </p>
      <button class="btn btn-success mt-5" @click="setQuestion">Start</button>
    </div>
    <div class="question-block" v-if="counter > 0 && !showResult">
      <Question
        :timeLimit="TIMER_LIMIT"
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
  data() {
    return {
      OPERATORS: ["+", "-", "*", "/"],
      NUMBER_OF_QUESTIONS: 10,
      TIMER_LIMIT: 10,
      MAX_NUMBER: 50,
      MAX_DECIMAL_PLACES: 0,
      counter: 0,
      questions: {},
      responses: {},
      score: 0,
      showResult: false,
    };
  },
  methods: {
    generateQuestion() {
      const idx = generateRandomIndex(3);
      const operand1 = generateRandomNumber(
        this.MAX_NUMBER,
        this.MAX_DECIMAL_PLACES
      );
      const operand2 =
        10 + generateRandomNumber(this.MAX_NUMBER, this.MAX_DECIMAL_PLACES);
      const expression = `${operand1} ${this.OPERATORS[idx]} ${operand2}`;
      return {
        id: ++this.counter,
        expression,
        answer: parseFloat(eval(expression).toFixed(this.MAX_DECIMAL_PLACES)),
      };
    },
    setQuestion() {
      const question = this.generateQuestion();
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
      if (this.counter >= this.NUMBER_OF_QUESTIONS) {
        this.showResult = true;
        return;
      }
      this.setQuestion();
    },
  },
};
</script>
