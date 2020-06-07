<template>
  <div class="email-slots">
    <h1>Email slots example</h1>

    <div class="example">
      <div class="content">
        <h2>Using fallback values</h2>
        <EmailContent>
          <template #salutation v-if="receiver2.firstName">
            <span>{{ receiver2.firstName }}</span>
          </template>
          {{ body }}
          <template #regards v-if="sender2.firstName">
            <span>{{ sender2.firstName }}</span>
          </template>
        </EmailContent>
      </div>
      <div class="content">
        <h2>Using dynamic values</h2>
        <EmailContent>
          <template #salutation v-if="receiver1.firstName">
            <span>{{ receiver1.firstName }}</span>
          </template>
          {{ body }}
          <template #regards v-if="sender1.firstName">
            <span>{{ sender1.firstName }}</span>
          </template>
        </EmailContent>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import EmailContent from "./Content";

export default {
  name: "EmailSlots",
  components: {
    EmailContent,
  },
  data() {
    return {
      body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      receiver1: {
        firstName: "Saurish",
        lastName: "Kar",
      },
      receiver2: {},
      sender1: {
        firstName: "John",
        lastName: "Doe",
      },
      sender2: {},
    };
  },
};
</script>

<style type="text/css" scoped>
.email-slots {
  width: 90vw;
  margin: auto;
}
.email-slots .example {
  display: flex;
}
.email-slots .example .content {
  padding: 0 2em;
}
.email-slots h2 {
  color: #e74c3c;
}
</style>
