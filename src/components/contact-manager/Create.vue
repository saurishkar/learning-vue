<template>
  <div class="contact-form">
    <form @submit.prevent="validate">
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-6 form-group">
              <label for="firstname">First name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="John"
                class="form-control"
                @change="elemChanged"
                v-model="formValues.firstname.value"
              />
              <div class="error" v-if="errors.firstname">
                {{ errors.firstname }}
              </div>
            </div>
            <div class="col-md-6 form-group">
              <label for="lastname">Last name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Doe"
                class="form-control"
                @change="elemChanged"
                v-model="formValues.lastname.value"
              />
              <div class="error" v-if="errors.lastname">
                {{ errors.lastname }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 form-group">
              <label for="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="johndoe@example.com"
                class="form-control"
                @change="elemChanged"
                v-model="formValues.email.value"
              />
              <div class="error" v-if="errors.email">{{ errors.email }}</div>
            </div>
          </div>
          <button type="submit" class="btn btn-success form-control">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">
import omit from "lodash/omit";
import { validateEach } from "@/helpers/validate";

export default {
  name: "ContactCreate",
  props: {
    create: Function
  },
  data() {
    return {
      formValues: {
        firstname: {
          value: "",
        },
        lastname: {
          value: "",
        },
        email: {
          value: "",
        },
      },
      errors: {},
      validations: {
        firstname: { presence: true },
        lastname: { presence: true },
        email: { presence: true, email: true }
      }
    };
  },
  methods: {
    validate() {
      const errors = validateEach(this.formValues, this.validations);
      if (Object.keys(errors).length) {
        return (this.errors = { ...errors });
      }
      return this.submitForm();
    },
    elemChanged(event) {
      this.errors = omit(this.errors, event.target.name);
    },
    submitForm() {
      let contactObj = {};
      Object.keys(this.formValues).map(
        (key) => (contactObj[key] = this.formValues[key].value)
      );
      this.create(contactObj);
      this.resetForm();
    },
    resetForm() {
      Object.keys(this.formValues).map(
        (key) =>  this.formValues[key].value = ""
      );
    }
  },
};
</script>

<style type="text/css" scoped>
  .contact-form {
    padding: 2em;
    text-align: left;
  }
  .contact-form label {
    font-weight: bolder;
  }
</style>
