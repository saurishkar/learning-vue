<template>
  <div class="cart">
    <h3>
      <span>
        Cart: <span class="total">${{ total.toFixed(2) }}</span>
      </span>
    </h3>
    <div class="line-items">
      <ProductShow
        v-for="lineItem in lineItems"
        :key="lineItem.name"
        :product="lineItem"
        :showRemoveBtn="true"
        @addItem="addItem"
        @removeItem="removeItem"
      />
    </div>
    <button
      v-if="lineItems.length"
      class="place-order"
      @click="$emit('placeOrder')"
    >
      Order
    </button>
  </div>
</template>

<script type="text/javascript">
import ProductShow from "@/components/ecommerce/product/Show";

import { generateTotal } from "@/helpers/cart";

export default {
  name: "Cart",
  components: {
    ProductShow,
  },
  props: {
    lineItems: Array,
    addItem: Function,
    removeItem: Function,
    placeOrder: Function,
  },
  computed: {
    total() {
      return generateTotal(this.lineItems);
    },
  },
};
</script>
<style type="text/css" scoped>
.cart {
  border: 1px solid black;
  width: 20%;
  position: relative;
  padding: 1em 0;
}
.cart .total {
  font-weight: bolder;
  color: blue;
}
.cart .product-show {
  border: none;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  height: 7em;
  width: 95%;
  padding: 1em;
  margin: 0;
  display: inline-flex;
}
.cart .product-show:last-child {
  border: none;
}
.cart .place-order {
  margin-top: 2em;
  width: 8em;
  padding: 0.5em 1em;
  background-color: black;
  color: white;
  border: none;
  border-radius: 2px;
  font-weight: bolder;
  font-size: 1em;
}
</style>
