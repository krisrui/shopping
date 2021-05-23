<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item='item'></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  components: {
    GoodsListItem,
  },
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
  .goods-list{
    display: flex;
    flex-wrap: wrap; 
    /*包裹 根据子元素的宽度 决定一行有几个*/
    justify-content: space-around;
    /* 均等分 中间为左右两边的2倍 */
  }
</style>