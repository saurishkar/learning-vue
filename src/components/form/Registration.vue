<template>
  <div>
    <h1>Registration Form Example</h1>
    <div class="form-container">
      <form @submit.prevent="validate" class="form">
        <div class="form-control">
          <label for="loginId">Login Id</label>
          <input
            type="text"
            v-model="formValues.loginId.value"
            name="loginId"
            id="loginId"
            placeholder="Your login id"
            @input="elemChanged"
          />
          <div class="error" v-if="errors.loginId">{{ errors.loginId }}</div>
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <input
            type="text"
            v-model="formValues.email.value"
            id="email"
            placeholder="johndoe@example.com"
            name="email"
            @input="elemChanged"
          />
          <div class="error" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form-control">
          <label for="name">Name</label>
          <input
            type="text"
            v-model="formValues.name.value"
            id="name"
            placeholder="John Doe"
            name="name"
            @input="elemChanged"
          />
          <div class="error" v-if="errors.name">{{ errors.name }}</div>
        </div>
        <div class="form-control">
          <label for="timezone">Timezone</label>
          <select
            v-model="formValues.timezone.value"
            name="timezone"
            class="select-timezone"
          >
            <option value="GMT">GMT</option>
            <option value="IST">IST</option>
            <option value="PDT">PDT</option>
          </select>
        </div>
        <div class="form-control">
          <label for="homePage">Homepage</label>
          <input
            type="text"
            v-model="formValues.homePage.value"
            name="homePage"
            id="homePage"
            placeholder="www.google.com"
            @input="elemChanged"
          />
          <div class="error" v-if="errors.homePage">{{ errors.homePage }}</div>
        </div>
        <div class="form-control aboutMe">
          <label for="aboutMe">About me</label>
          <textarea
            v-model="formValues.aboutMe.value"
            name="aboutMe"
            id="aboutMe"
            @input="elemChanged"
          />
          <div class="error" v-if="errors.aboutMe">{{ errors.aboutMe }}</div>
        </div>
        <div class="form-control notify">
          <input
            type="checkbox"
            v-model="formValues.notify.value"
            name="notify"
            id="notify"
          />
          <label for="notify">
            <div class="label">
              <b>Receive notification of comments</b>
              <div>
                You will be sent an email when someone posts comments to your
                Blog or Album
              </div>
            </div>
          </label>
        </div>
        <div class="button-field">
          <button type="submit" class="button-success">Go</button>
          <p>Your password will be mailed to you</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
import omit from "lodash/omit";
import { validateEach } from "@/helpers/validate";

const defaultFormObj = Object.freeze({
  value: "",
});

export default {
  name: "RegistrationForm",
  data() {
    return {
      errors: {},
      formValues: {
        loginId: { ...defaultFormObj },
        name: { ...defaultFormObj },
        aboutMe: { ...defaultFormObj },
        timezone: {
          ...defaultFormObj,
          value: "GMT",
        },
        notify: { ...defaultFormObj, value: false },
        homePage: { ...defaultFormObj },
        email: { ...defaultFormObj },
      },
      validations: {
        loginId: { presence: true },
        name: { presence: true },
        aboutMe: {
          presence: true,
          length: { max: 100 },
        },
        timezone: { presence: true },
        notify: {
          presence: true,
        },
        homePage: { presence: true, url: true },
        email: { presence: true, email: true },
      },
    };
  },
  methods: {
    validate() {
      const errors = validateEach(this.formValues, this.validations);
      if(Object.keys(errors).length) {
        this.errors = { ...errors };
        return;
      }
      return this.submitForm();
    },
    submitForm() {
      alert("Form submitted");
      const {
        loginId,
        name,
        email,
        timezone,
        notify,
        homePage,
        aboutMe,
      } = this.formValues;
      this.formValues = {
        loginId: { ...loginId, value: "" },
        name: { ...name, value: "" },
        aboutMe: { ...aboutMe, value: "" },
        timezone: { ...timezone, value: "GMT" },
        notify: { ...notify, value: false },
        homePage: { ...homePage, value: "" },
        email: { ...email, value: "" },
      };
    },
    elemChanged(event) {
      this.errors = omit(this.errors, event.target.name);
    },
  },
};
</script>

<style type="text/css" scoped>
.form {
  display: flex;
  flex-direction: column;
  flex-grow: all;
  max-width: 30em;
  margin: auto;
  padding: 2em 1em;
  border: 2px solid #34495e;
  border-radius: 3px;
}
.form-control {
  display: block;
  margin: 0.5em 0;
}
.form-control label {
  width: 50%;
  padding: 0.5em 0;
  display: inline-flex;
  box-sizing: border-box;
}
.form-control input,
.form-control textarea,
.form-control select {
  width: 40%;
  border-radius: 1px;
  border: 1px solid #d7dbdd;
  padding: 0.5em;
  outline: none;
}
.select-timezone {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  box-sizing: content-box;
}
.notify input {
  width: 2em;
}
.notify label {
  width: 90%;
  text-align: justify;
}
.form-control .error {
  float: right;
  font-size: 0.8em;
  color: red;
  margin-right: 1.4em;
}
.form-control.aboutMe label {
  width: 93%;
}
.form-control textarea {
  display: flex;
  margin-left: 1.4em;
  height: 6em;
  width: 90%;
  resize: none;
}
button {
  width: 10em;
  padding: 0.5em;
  cursor: pointer;
  font-size: 1em;
  font-weight: bolder;
  margin: 1em;
  outline: none;
}
.button-success {
  background-color: #58d68d;
  color: white;
  border: none;
}
</style>
