<template>
  <div class="navbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="middle"><slot name="middle"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
<style>
.navbar {
  font-size: 18px;
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 0 rgba(100, 100, 100, 0.3);
}
.left,.right {
  width: 60px;
  /* background: red; */
}
.middle {
  flex: 1;
}
</style>