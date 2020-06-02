<template>
  <div class="health-container">
    <div class="total"></div>
    <div class="used" :style="{ 'width': `${health}%`, 'background-color': bgColor }"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Health",
  props: {
    health: Number
  },
  computed: {
    bgColor() {
      if(this.health < 20) {
        return "#E74C3C";
      } else if(this.health < 50) {
        return "#F4D03F";
      }
      return "#2ECC71";
    }
  }
};
</script>

<style type="text/css" scoped>
  .health-container {
    height: 2em;
    width: 80%;
    position: relative;
    background-color: transparent;
    justify-content: center;
    margin: auto;
    /*border: 2px solid #E5E7E9;*/
  }
  .health-container .used {
    height: 100%;
    position: absolute;
    background-color: #2ECC71;
    transition: 1s ease;
  }
  .health-container .total {
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #E5E7E9;
  }
</style>