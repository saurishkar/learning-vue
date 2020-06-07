<template>
  <div class="email-content">
    <p>
      <span>Hi </span>
      <slot name="salutation">
        <span>Sir</span>
      </slot>
      <span>,</span>
    </p>
    <slot></slot>
    <p>
      Regards,<br />
      <slot name="regards">
        <span>Anonymous</span>
      </slot>
    </p>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "EmailContent",
};
</script>

<style type="text/css" scoped>
.email-content {
  justify-content: left;
  text-align: left;
}
</style>
