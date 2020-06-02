<template>
  <div class="event-history">
    <div v-for="(log, index) in logs" :key="index" class="event-log">
      {{ log }}
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "EventHistory",
  props: {
    logs: Array
  },
};
</script>

<style type="text/css">
  .event-history {
    width: 50%;
    max-height: 20em;
    overflow-y: scroll;
    margin: 1em auto;
    justify-content: center;
  }
  .event-history .event-log {
    padding: 0.8em;
    background-color: #2980B9;
    color: white;
    font-weight: bolder;
    text-transform: capitalize;
    border-bottom: 1px dotted white;
  }
</style>
