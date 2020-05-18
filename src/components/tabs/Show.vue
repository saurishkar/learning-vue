<template>
  <div class="tab" @click="onClick(tab.name)">
    <div class="tab-name" :class="activeClass">{{ tab.name }}</div>
    <ul class="sub-tabs" v-if="active">
      <li v-for="subTab in subTabs" :key="subTab.name">
        <TabShow
          :tab="subTab"
          :active="activeChildTab === subTab.name"
          :onClick="onSubTabClick"
          :setContent="setContent"
        />
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import get from "lodash/get";
import TabShow from "./Show";

export default {
  name: "TabShow",
  components: {
    TabShow,
  },
  props: ["tab", "active", "onClick", "setContent"],
  data: function() {
    return {
      subTabs: this.tab.subTabs,
      activeChildTab: "",
    };
  },
  mounted: function() {
    this.activeChildTab = get(this.subTabs, "[0].name", "");
  },
  updated: function() {
    if (!this.active) {
      this.activeChildTab = get(this.subTabs, "[0].name", "");
    }
  },
  computed: {
    activeClass: function() {
      return this.active ? "active" : "";
    }
  },
  // watch: {
  //   activeChildTab: function(oldTab, newTab) {
  //     const activeTab = this.subTabs.find((tab) => tab.name === newTab);
  //     this.setContent(get(activeTab, "content", ""));
  //   },
  //   active: function() {
  //     this.setContent("");
  //   }
  // },
  methods: {
    onSubTabClick: function(tabName = "") {
      this.activeChildTab = tabName;
    },
  },
};
</script>
<style type="text/css" scoped>
ul {
  list-style-type: none;
  text-align: left;
  padding: 0 1em;
}
li {
  padding: 0.5em 0;
}
.tab:hover {
  cursor: pointer;
}
.tab-name {
  font-weight: bold;
  font-size: 1.2em;
  text-transform: capitalize;
}
.tab-name.active {
  color: #58d68d;
}
</style>
