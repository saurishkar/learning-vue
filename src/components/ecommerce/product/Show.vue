<template>
  <div class="product-show">
    <div class="image"><img :src="product.image" /></div>
    <div class="detail">
      <div class="name">{{ product.name }}</div>
      <div class="specification">
        <span>
          ${{ product.price }} <span>({{ product.storage }})</span>
        </span>
      </div>
      <div class="cart-actions">
        <button
          class="add-to-cart"
          v-if="showAddBtn && !addedToCart"
          @click="$emit('addItem', product)"
        >
          Add to cart
        </button>
        <button
          class="remove-from-cart"
          v-if="showRemoveBtn"
          @click="$emit('removeItem', product)"
        >
          Remove
        </button>
        <div v-if="addedToCart" class="note">Added !</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "ProductShow",
  props: {
    product: Object,
    addItem: Function,
    showRemoveBtn: Boolean,
    showAddBtn: Boolean,
    addedToCart: Boolean
  },
};
</script>
<style type="text/css" scoped>
.product-show {
  border: 1px solid black;
  height: 10em;
  width: 40%;
  padding: 1em;
  box-sizing: border-box;
  margin: 0 1em;
  display: inline-flex;
}
.product-show .image {
  height: 100%;
  text-align: left;
}
.product-show .image img {
  height: 100%;
}
.product-show .detail {
  position: relative;
  width: 70%;
  text-align: left;
}
.product-show .detail .name {
  font-weight: bolder;
  font-size: 100%;
  text-overflow: ellipsis;
}
.product-show .detail .specification {
  font-weight: bolder;
  font-size: 90%;
  color: #c0392b;
  margin-bottom: 1em;
}
.product-show .detail .cart-actions .add-to-cart,
.product-show .detail .cart-actions .remove-from-cart {
  padding: 0.5em 1em;
  width: 8em;
  border: none;
  border-radius: 2px;
  font-size: 90%;
  font-weight: bolder;
  color: white;
  background-color: #1abc9c;
  position: relative;
  outline: none;
}
.product-show .detail .cart-actions .remove-from-cart {
  background-color: #E74C3C;
  font-size: 70%;
}
.product-show .detail .cart-actions .add-to-cart:hover,
.product-show .detail .cart-actions .remove-from-cart:hover {
  cursor: pointer;
}
.product-show .detail .cart-actions .note {
  font-weight: bolder;
  color: #1abc9c;
}
</style>
