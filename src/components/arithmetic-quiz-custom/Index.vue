<template>
  <div class="arithmetic-quiz-generator px-5">
    <h1>
      Customize your own arithmetic quiz
    </h1>
    <form class="custom-quiz-form mt-5" @submit.prevent="generateQuiz">
      <div class="row">
        <div
          class="col-md-3 form-group"
          v-for="formField in formFields"
          :key="formField.name"
        >
          <label>{{ formField.label }}</label>
          <input
            type="number"
            class="form-control"
            :min="formField.min"
            :name="formField.name"
            :value="quizConfig[formField.name]"
            @input="handleInputChange"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-8">
          <label>Select operators to be included</label>
          <ul class="operator-list">
            <li v-for="operator in operators" :key="operator">
              <input
                type="checkbox"
                :name="operator"
                :id="operator"
                :value="operator"
                :checked="quizConfig.operators[operator]"
                @input="handleCheckboxChange"
              />
              <label :for="operator">{{ operator }}</label>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <input type="submit" class="btn btn-primary float-right" />
        </div>
      </div>
    </form>
    <div class="quiz-list-container">
      <Quiz v-for="quiz in quizList" :key="quiz.id" :config="quiz" />
    </div>
  </div>
</template>

<script type="text/javascript">
import Quiz from "@/components/arithmetic-quiz-custom/Quiz";

const defaultValues = Object.freeze({
  minOperand: 1,
  maxOperand: 1,
  questionCount: 1,
  timerLimit: 1,
  operators: Object.freeze({ "+": false, "-": false, "*": false, "/": false }),
});

export default {
  name: "Index",
  components: {
    Quiz,
  },
  data() {
    return {
      operators: [ ...Object.keys(defaultValues.operators) ],
      formFields: [
        {
          name: "minOperand",
          label: "Operand min limit",
          min: 1,
        },
        {
          name: "maxOperand",
          label: "Operand max limit",
          min: 1,
        },
        {
          name: "questionCount",
          label: "Number of questions",
          min: 1,
        },
        {
          name: "timerLimit",
          label: "Time per question",
          min: 10,
        },
      ],
      quizConfig: { ...defaultValues },
      quizList: [],
    };
  },
  methods: {
    generateQuiz() {
      const quizId = this.quizList.length + 1;
      this.quizList = [...this.quizList, { id: quizId, ...this.quizConfig }];
      this.resetFields();
    },
    handleInputChange(event) {
      this.quizConfig[event.target.name] = parseInt(event.target.value);
    },
    handleCheckboxChange(event) {
      this.quizConfig.operators[event.target.value] = event.target.checked;
    },
    resetFields() {
      this.quizConfig = defaultValues;
      console.log(this.quizConfig);
    },
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
