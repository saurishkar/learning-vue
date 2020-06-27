<template>
  <div class="contact-show">
    <button @click="$emit('remove', contact)" class="close text-danger">
      <span aria-hidden="true">&times;</span>
    </button>
    <div class="email">{{ contact.email }}</div>
    <div class="name">{{ fullname }}</div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "ContactShow",
  props: {
    contact: Object,
    remove: Function,
  },
  computed: {
    fullname() {
      return this.contact.firstname + " " + this.contact.lastname;
    },
  },
};
</script>

<style type="text/css" scoped>
.contact-show {
  width: 25%;
}
</style>
