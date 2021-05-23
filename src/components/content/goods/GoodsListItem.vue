<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="good-list-item-info">
      <div>{{ goodsItem.title }}</div>
      <span class="good-list-item-info-price">{{ goodsItem.price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad"); // 事件总线
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid); //拿到iid传过去 动态路由的方式

      // 通过query方式
      /*    this.$router.push({
        path:'/detail',
        query:{
          iid:this.goodsItem.iid
        }
      }) 
  */
    },
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed:{
    showImage(){
      // console.log(this.goodsItem)
      return this.goodsItem.image || this.goodsItem.show.img 
    }
  }
};
</script>
<style scoped>
.goods-list-item {
  /* padding-bottom: 50px; */
  position: relative;
  width: 180px;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.good-list-item-info {
  /* position: absolute;
      left: 0;
      right: 0;
      bottom: 8px; */
  text-align: center;
  font-size: 14px;
}
.good-list-item-info-price {
  color: red;
}
</style>