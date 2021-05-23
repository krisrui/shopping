<template>
  <div id="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
  },
};
</script>
<style scoped>
#cart-list {
  height: calc(100% - 44px - 49px - 40px); /* 四则运算前后要加空格 */
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>