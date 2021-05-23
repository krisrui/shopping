<template>
  <div id="detail-swiper">
    <swiper class="hidden">
      <swiper-item v-for="(item,index) in swiperDatas" :key="index"  >
          <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper";
import SwiperItem from "components/common/swiper/SwiperItem";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    swiperDatas: {
      type: Array,
      default() {
        return []
      },
    },
  },
};
</script>
<style scoped>
.hidden{
  height: 300px;
}
</style>