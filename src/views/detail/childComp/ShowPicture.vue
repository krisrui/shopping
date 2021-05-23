<template>
  <div class="show-picture">
    <div class="pictures">
      <img
        :src="item"
        alt=""
        v-for="(item, index) in picture"
        :key="index"
        @load="imgLoaded"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowPicture",
  props: {
    picture: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  watch: {
    picture() {
      this.imagesLength = this.picture.length;
      console.log(this.imagesLength);
    },
  },
  methods: {
    imgLoaded() {
      // 最后一张图片加载完成后才重新更新scroll
      if (++this.counter === this.imagesLength) {
        this.$emit("imgLoaded");
        console.log("完成");
      }
    },
  },
};
</script>
<style scoped>
.pictures img {
  width: 375px;
}
</style>