<template>
  <div class="navbar">
    <ul>
      <li class="brand"><img :src="logoSrc" /></li>
      <li class="link-home"><a href="/">Home</a></li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import logo from "../../assets/logo.png";
export default {
  name: "Navbar",
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
  margin: 0;
  padding: 0;
  display: flex;
  height: 3em;
  max-height: 3em;
}
li {
  display: inline-block;
  height: 100%;
  align-content: right;
  padding: 0.8em 0;
  margin: 0 1em;
  box-sizing: border-box;
}
.link-home:hover {
  background-color: #273746;
}
li a {
  color: white;
  font-weight: bolder;
  text-decoration: none;
  padding: 0.8em 1em;
  box-sizing: border-box;
}
li a:hover {
  color: #1ABC9C;
}
.navbar {
  background: black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 1em;
  box-sizing: border-box;
}
.brand img {
  max-height: 100%;
  display: block;
}
</style>
