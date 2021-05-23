<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in datas"
      :key="item.id"
      :class="{ active: index == currentData }"
      @click="changeData(index)"
    >
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentData: 0,
    };
  },
  props: {
    datas: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    changeData(index) {
      //拿到点击的索引值 赋值给currentData
      this.currentData = index;
      this.$emit("tabClick", index); // 子组件发送给父组件信息，父组件根据子组件信息更改展现的内容
      console.log(index);
    },
  },
};
</script>
<style scoped>
.tab-control {
  display: flex;
  font-size: 18px;
  background: white;
}
.tab-control-item {
  line-height: 40px;
  height: 40px;
  text-align: center;
  flex: 1;
}
.active {
  color: "pink";
}
/*积极时 将下面的span显示样式*/
.active span {
  border-bottom: 2px solid red;
  padding: 4px;
}
</style>