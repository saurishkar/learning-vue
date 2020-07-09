<template>
  <div class="order-summary">
    <h2>Congratulations! Your order has been successfully placed.</h2>
    <ProductShow
      v-for="lineItem in lineItems"
      :key="lineItem.name"
      :product="lineItem"
    />
    <h3>Items Ordered: {{ lineItems.length }}</h3>
    <h3>Total: ${{ total.toFixed(2) }}</h3>
  </div>
</template>

<script type="text/javascript">
import ProductShow from "@/components/ecommerce/product/Show";
import { generateTotal } from "@/helpers/cart";

export default {
  name: "OrderSummary",
  components: {
    ProductShow
  },
  props: {
    lineItems: Array,
  },
  computed: {
    total() {
      return generateTotal(this.lineItems);
    },
  },
};
</script>
