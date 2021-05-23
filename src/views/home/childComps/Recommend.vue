<template>
  <div class="recommend">
    <div v-for="(item, i) in recommends" :key="i" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommends: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.recommend {
  display: flex;
  padding-top:6px;
}
.recommend-item {
    flex: 1;
    text-align: center;
}
.recommend-item img{
    width:65px;
    height:65px
}
</style>