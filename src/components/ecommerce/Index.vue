<template>
  <div class="ecommerce">
    <h1>Custom Events Example</h1>
    <div class="menu" v-if="!orderPlaced">
      <div class="product-list">
        <ProductShow
          v-for="product in products"
          :key="product.name"
          :product="product"
          :showAddBtn="true"
          :addedToCart="presentInCart(product)"
          @addItem="addItemToCart"
          @removeItem="removeItemFromCart"
        />
      </div>
      <Cart
        :lineItems="lineItems"
        :addItem="addItemToCart"
        :removeItem="removeItemFromCart"
        @placeOrder="placeOrder"
      />
    </div>
    <OrderSummary v-if="orderPlaced" :lineItems="lineItems" />
  </div>
</template>

<script type="text/javascript">
import ProductShow from "@/components/ecommerce/product/Show";
import OrderSummary from "@/components/ecommerce/OrderSummary";
import Cart from "./Cart";

import productGold from "@/assets/images/product/gold.png";
import productGreen from "@/assets/images/product/green.png";
import productGrey from "@/assets/images/product/grey.png";
import productSilver from "@/assets/images/product/silver.png";

const orderStates = Object.freeze({
  cart: "ready-for-cart",
  placed: "placed",
});

export default {
  name: "Ecommerce",
  components: {
    ProductShow,
    Cart,
    OrderSummary
  },
  data() {
    return {
      lineItems: [],
      products: [
        {
          id: 1,
          name: "Iphone 11 Pro (Silver)",
          price: "999",
          storage: "64gb",
          image: productSilver,
        },
        {
          id: 2,
          name: "Iphone 11 Pro (Grey)",
          price: "1199",
          storage: "128gb",
          image: productGrey,
        },
        {
          id: 3,
          name: "Iphone 11 Pro (Gold)",
          price: "1399",
          storage: "256gb",
          image: productGold,
        },
        {
          id: 4,
          name: "Iphone 11 Pro (Midnight Green)",
          price: "1599",
          storage: "512gb",
          image: productGreen,
        },
      ],
      orderState: orderStates.cart,
    };
  },
  computed: {
    orderPlaced() {
      return this.orderState === orderStates.placed;
    },
  },
  methods: {
    addItemToCart(item = {}) {
      this.lineItems = [...this.lineItems, item];
    },
    placeOrder() {
      this.orderState = orderStates.placed;
    },
    presentInCart(product = {}) {
      return this.lineItems.some((lineItem) => lineItem.id === product.id);
    },
    removeItemFromCart(product = {}) {
      this.lineItems = this.lineItems.filter((item) => item.id != product.id);
    },
  },
};
</script>

<style type="text/css" scoped>
.menu {
  display: inline-flex;
  margin: 1em;
  width: 100%;
  position: relative;
  justify-content: center;
}
.menu .product-list {
  width: 70%;
  padding: 0;
  /*border: 1px solid black;*/
}
</style>
