<template>
  <div class="tab" @click.stop="$emit('onClick', tab)">
    <div class="tab-name" :class="activeClass">{{ tab.name }}</div>
    <ul class="sub-tabs" v-if="active">
      <li v-for="subTab in subTabs" :key="subTab.name">
        <TabShow
          :tab="subTab"
          :active="activeChildTab === subTab.name"
          :setContent="setContent"
          @onClick="onSubTabClick"
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
      activeChildTab: "",
    };
  },
  computed: {
    activeClass: function() {
      return this.active ? "active" : "";
    },
    subTabs: function() {
      return this.tab.subTabs;
    }
  },
  methods: {
    onSubTabClick: function(tab = {}) {
      this.activeChildTab = tab.name;
      this.setContent(tab);
    },
  },
  watch: {
    active: function(oldVal, newVal) {
      if(oldVal && !newVal) {
        this.activeChildTab = "";
      }
    }
  },
  updated: function() {
    const { active, activeChildTab, subTabs } = this;
    if(active && !activeChildTab && get(subTabs, "length", 0)) {
      this.activeChildTab = get(subTabs, "[0].name", "");
    }
  }
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
