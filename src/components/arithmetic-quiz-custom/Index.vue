<template>
  <div class="arithmetic-quiz-generator px-5">
    <h1>
      Customize your own arithmetic quiz
    </h1>
    <form class="custom-quiz-form mt-5" @submit.prevent="generateQuiz">
      <div class="row">
        <div class="col-md-3 form-group">
          <label>Operand min limit</label>
          <input
            type="number"
            class="form-control"
            :min="1"
            name="minOperand"
            :value="quizFormValues.minOperand"
            @input="handleInputChange"
          />
        </div>
        <div class="col-md-3 form-group">
          <label>Operand max limit</label>
          <input
            type="number"
            class="form-control"
            :min="1"
            name="maxOperand"
            :value="quizFormValues.maxOperand"
            @input="handleInputChange"
          />
        </div>
        <div class="col-md-3 form-group">
          <label>Number of questions</label>
          <input
            type="number"
            class="form-control"
            :min="1"
            name="questionCount"
            :value="quizFormValues.questionCount"
            @input="handleInputChange"
          />
        </div>
        <div class=" col-md-3 form-group">
          <label>Timer per question</label>
          <input
            type="number"
            class="form-control"
            :min="10"
            name="timerLimit"
            :value="quizFormValues.timerLimit"
            @input="handleInputChange"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-8">
          <label>Select operators to be included</label>
          <ul class="operator-list">
            <li v-for="operator in operators" :key="operator.key">
              <input
                type="checkbox"
                :name="operator.key"
                :id="operator.key"
                :value="operator.sym"
                :checked="quizFormValues.operators[operator.key]"
                @input="handleCheckboxChange"
              />
              <label :for="operator.key">{{ operator.sym }}</label>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <input type="submit" class="btn btn-primary float-right" />
        </div>
      </div>
    </form>
    <div class="quiz-list-container">
      <Quiz
        v-for="quiz in quizList"
        :key="quiz.id"
        :config="quiz"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import Quiz from "@/components/arithmetic-quiz-custom/Quiz";

export default {
  name: "Index",
  components: {
    Quiz,
  },
  data() {
    return {
      operators: {
        plus: {
          sym: "+",
          key: "plus",
        },
        minus: {
          sym: "-",
          key: "minus",
        },
        multiply: {
          sym: "*",
          key: "multiply",
        },
        divide: {
          sym: "/",
          key: "divide",
        },
      },
      quizFormValues: {
        minOperand: 1,
        maxOperand: 1,
        questionCount: 1,
        timerLimit: 1,
        operators: {
          "+": false,
          "-": false,
          "*": false,
          "/": false
        }
      },
      quizList: [],
    };
  },
  methods: {
    generateQuiz() {
      const quizId = this.quizList.length + 1;
      this.quizList = [ ...this.quizList, { id: quizId, ...this.quizFormValues }];
    },
    handleInputChange(event) {
      this.quizFormValues[event.target.name] = parseInt(event.target.value);
    },
    handleCheckboxChange(event) {
      this.quizFormValues.operators[event.target.value] = event.target.checked;
      console.log(this.quizFormValues);
    },
    resetFields() {

    }
  },
};
</script>

<style type="text/css" scoped>
.custom-quiz-form {
  width: 100%;
  text-align: left;
}
.operator-list {
  padding: 0;
}
.operator-list li {
  display: inline;
  padding: 0 2em 0 0;
}
.operator-list li label {
  font-size: 1.5em;
}
.operator-list li input {
  margin-right: 0.3em;
  vertical-align: middle;
  font-size: 4.5em;
}
.btn {
  position: relative;
  top: 1em;
}
.quiz-list-container {
  justify-content: left;
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
