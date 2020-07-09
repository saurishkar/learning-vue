<template>
  <div>
    <img :src="logoSrc" />
    <h1>Learning Vue Track</h1>
    <ul>
      <li><a href="/examples/tabs">Tabs Example</a></li>
      <li><a href="/examples/form">Form Example</a></li>
      <li><a href="/examples/todos">Todos List Example</a></li>
      <li><a href="/examples/monster-attack">Monster Attack Example</a></li>
      <li><a href="/examples/custom-events">Custom Events Example</a></li>
      <li><a href="/examples/email-slots">Email Slots</a></li>
      <li><a href="/examples/contact-manager">Contact Manager</a></li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import logo from "../assets/logo.png";
export default {
  name: "Home",
  data: function() {
    return {
      logoSrc: logo
    }
  }
};
</script>
<style type="text/css" scoped>
  ul {
    list-style-type: none;
  }
  li {
    display: inline-block;
    padding: 1em;
  }
</style>