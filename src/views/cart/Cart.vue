<template>
  <div id="cart">
    <nav-bar class="nav-bar"
      ><div slot="middle">购物车({{ cartLength }})</div>
    </nav-bar>

    <cart-list></cart-list>

    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar";
import { mapGetters } from "vuex";
import CartList from "./childComp/CartList";
import BottomBar from "./childComp/BottomBar";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar,
  },
  computed: {
    // cartLength(){
    //   return this.$store.state.cartList.length
    // }
    // 从store中getters导入计算属性
    /*     ...mapGetters({
      length:'cartLength' 自定义姓名使用
    }) */

    ...mapGetters(["cartLength"]),
  }
};
</script>
<style scoped>
#cart {
  height: 100vh;
}
.nav-bar {
  background: pink;
}
</style>