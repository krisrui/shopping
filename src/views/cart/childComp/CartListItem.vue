<template>
  <div id="cart-list-item">
    <div class="click-botton"><!-- 组件的点击事件要加.native修饰  -->
      <click-botton @click.native="isClicked"  :is-click='product.checked'></click-botton>
    </div>
    <div class="item-imgae"><img :src="product.image" alt="商品图片" /></div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-price">价格 : {{ product.price }}</div>
      <div class="item-count">数量 : {{ product.count }}</div>
    </div>
  </div>
</template>

<script>
import ClickBotton from "./ClickBotton";
export default {
  name: "CartListItem",
  components: {
    ClickBotton,
  },
  props: {
    product: {
      type: Object,
      default: {},
    },
  },
  methods: {
    isClicked() {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>
<style scoped>
.click-botton{
  display: flex;
  align-items: center;
  margin-right: 3px;
}
#cart-list-item {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid red;
}

.item-imgae img {
  width: 150px;
  height: 150px;
  display: block;
}
.item-info {
  margin-left: 8px;
  width: 170px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.item-price{
  color: red;
}
</style>