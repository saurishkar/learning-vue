<template>
  <div class="arithmetic-quiz-generator px-5">
    <h1>
      Customize your own arithmetic quiz
    </h1>
    <form class="custom-quiz-form mt-5" @submit.prevent="generateQuiz">
      <div class="errors">
        <div
          class="error alert alert-danger"
          v-for="error in configErrors"
          :key="error"
        >{{ error }}</div>
      </div>
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
            <li v-for="operator in quizConfig.operators" :key="operator.id">
              <input
                type="checkbox"
                :name="operator"
                :id="operator.id"
                :value="operator.id"
                :checked="operator.checked"
                @input="handleCheckboxChange"
              />
              <label :for="operator.id">{{ operator.title }}</label>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <input type="submit" class="btn btn-primary float-right" />
        </div>
      </div>
    </form>
    <div class="quiz-list-container row">
      <div class="quiz col-md-4" v-for="quiz in quizList" :key="quiz.id">
        <Quiz :config="quiz" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import omit from "lodash/omit";
import forIn from "lodash/forIn";

import Quiz from "@/components/arithmetic-quiz/Quiz";

import { operators as arithOps } from "@/constants/defaults";

const defaultValues = Object.freeze({
  minOperand: 10,
  maxOperand: 20,
  questionCount: 5,
  timerLimit: 10,
  operators: Object.values(arithOps).reduce((acc, op) => {
    return { ...acc, [op.id]: {
      ...op,
      checked: false
    }};
  }, {})
});

export default {
  name: "Index",
  components: {
    Quiz,
  },
  data() {
    return {
      formFields: [
        {
          name: "minOperand",
          label: "Operand min limit",
          min: 10,
        },
        {
          name: "maxOperand",
          label: "Operand max limit",
          min: 10,
        },
        {
          name: "questionCount",
          label: "Number of questions",
          min: 5,
        },
        {
          name: "timerLimit",
          label: "Time per question",
          min: 10,
        },
      ],
      quizConfig: { ...defaultValues },
      quizList: [],
      configErrors: []
    };
  },
  methods: {
    areFormErrorsPresent() {
      let formErrors = [];
      const operatorSelected = Object.values(this.quizConfig.operators).some((op) => op.checked);
      forIn(omit(this.quizConfig, ["operators"]), (value, key) => {
        if(typeof value != "number") {
          formErrors.push(`${key} is Required`);
        }
      })
      if(!operatorSelected) {
        formErrors.push("Select atleast one operator");
      }
      return formErrors;
    },
    generateQuiz() {
      this.configErrors = this.areFormErrorsPresent();
      if(this.configErrors.length) {
        return;
      }
      const quizId = this.quizList.length + 1;
      this.quizList = [...this.quizList, { id: quizId, ...this.quizConfig }];
      this.resetFields();
    },
    handleInputChange(event) {
      const value = parseInt(event.target.value);
      this.quizConfig[event.target.name] = isNaN(value) ? "" : value;
    },
    handleCheckboxChange(event) {
      let op = this.quizConfig.operators[event.target.value];
      op.checked = event.target.checked;
    },
    resetFields() {
      this.quizConfig = { ...defaultValues };
      this.configErrors = [];
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
