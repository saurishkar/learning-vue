<template>
  <div class="tab-content">
    <h3 class="title">{{ name }}</h3>
    <div class="content">
      <h4 class="subtitle">{{ subTitle }}</h4>
      <div class="description">{{ value }}</div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "TabContent",
  props: ["value", "name", "subTitle"],
};
</script>

<style type="text/css" scoped>
  .tab-content {
    position: relative;
    justify-content: left;
    width: 100%;
    padding: 0 3em;
  }
  .tab-content .title {
    border-bottom: 1px solid #58d68d;
    text-transform: capitalize;
    text-align: left;
    font-weight: bolder;
    color: #58d68d;
  }
  .tab-content .content {
    text-align: justify;
  }
  .subtitle {
    text-transform: capitalize;
  }
</style>