<template>
  <div class="tabs">
    <h1>This is a tabs component example</h1>
    <div class="tab-nav">
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
    </div>
    <div class="tab-body">
      <TabContent :value="content" :name="activeTab" />
    </div>
  </div>
</template>

<script type="text/javascript">
import get from "lodash/get";
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
    console.log(get(this.tabs, "[0].subTabs.0.content", ""))
    this.content = get(this.tabs, "[0].subTabs.0.content", "");
  },
  methods: {
    setTabActive: function(tab = {}) {
      this.activeTab = tab.name;
      this.content = get(tab, "subTabs.0.content", "");
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
.tabs {
  position: relative;
}
.tab-nav {
  display: inline-flex;
  width: 25%;
  box-sizing: border-box;
  border-right: 2px solid #58d68d;
}
.tab-body {
  display: inline-flex;
  width: 75%;
  height: 100%;
  vertical-align: middle;
  justify-content: space-around;
  box-sizing: border-box;
}
</style>
