<template>
  <div class="tabs">
    <h1>This is a tabs component example</h1>
    <ul>
      <li v-for="tab in tabs" :key="tab.name">
        <TabShow
          :tab="tab"
          :active="activeTab === tab.name"
          :onClick="setTabActive"
          :setContent="setContent"
        />
      </li>
    </ul>
    <TabContent :value="content" />
  </div>
</template>

<script type="text/javascript">
// import get from "lodash/get";
import TabShow from "./Show";
import TabContent from "./Content";
import TabData from "../../constants/tabs.json";

export default {
  name: "TabIndex",
  components: {
    TabShow,
    TabContent,
  },
  data: function() {
    return {
      tabs: TabData,
      activeTab: "",
      content: "",
    };
  },
  mounted: function() {
    this.activeTab = this.tabs[0].name;
  },
  methods: {
    setTabActive: function(tabName = "") {
      this.activeTab = tabName;
    },
    setContent: function(content = "") {
      this.content = content;
    },
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
  padding: 0.5em 0;
}
</style>
