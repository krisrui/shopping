<template>
  <div id="bottom-nar">
    <div class="cart"  @click="addToCart">加入购物车</div>
  </div>
</template>

<script>
export default {
  name: "BottomNar",
  methods: {
    addToCart(){
      console.log("111");
      this.$emit("addToCart");
    },
  },
}
</script>
<style scoped>
#bottom-nar {
  height: 49px;
  position: relative;
  background: #fff;
}
.cart {
  width: 100px;
  text-align: center;
  line-height: 49px;
  background: pink;
}
</style>