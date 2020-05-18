<template>
  <div class="tab">
    <div class="tab-name">{{ tab.name }}</div>
    <ul class="sub-tabs">
      <li v-for="subTab in subTabs" :key="subTab.name">
        <TabShow :tab="subTab" />
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import TabShow from "./Show";

export default {
  name: "TabShow",
  components: {
    TabShow,
  },
  props: ["tab"],
  data: function() {
    return {
      subTabs: this.tab.subTabs,
    };
  },
};
</script>
<style type="text/css" scoped>
ul {
  list-style-type: none;
  padding: 0.5em 1em;
  text-align: left;
}
.tab-name {
  font-weight: bold;
  font-size: 1.2em;
  text-transform: capitalize;
}
</style>
