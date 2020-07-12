<template>
  <div class="timer-container container">
    <div class="badge badge-danger px-3 py-2">{{ count }} seconds remaining</div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Timer",
  props: {
    count: Number
  }
};
</script>
