<template>
  <div class="click-botton" :class="{ active: isClick }">
    <img src="~assets/img/clickBotton/click.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "ClickBotton",
  props: {
    isClick: {
      type: Boolean,
      default:false
    },
  },
};
</script>
<style scoped>

.click-botton {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid grey;
}
.active {
  background: red;
  border-color: red
}
.click-botton img {
  width: 35px;
  height: 35px;
}
</style>