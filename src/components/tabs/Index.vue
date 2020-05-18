<template>
  <div class="tabs">
    <h1>This is a tabs component example</h1>
    <ul>
      <li v-for="tab in tabs" :key="tab.name">
        <TabShow :tab="tab" />
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import TabShow from "./Show";
import TabData from "../../constants/tabs.json";

export default {
  name: "TabIndex",
  components: {
    TabShow,
  },
  data: function() {
    return {
      tabs: TabData,
    };
  },
};
</script>

<style type="text/css" scoped>
ul {
  list-style-type: none;
  padding: 0 1em;
  text-align: left;
}
li {
  display: block;
}
</style>
