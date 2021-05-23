<template>
  <div id="app" >
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive> <!-- 路由不重新创建 -->
    <tab-bar>
      <tab-bar-item path='/home'  > 
        <img slot="item-img" src="~assets/img/tabbar/首页.svg" alt="" />
        <img slot="item-img-active" src="~assets/img/tabbar/首页1.svg" alt="" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category'>
        <img slot="item-img" src="~assets/img/tabbar/分类.svg" alt="" />
        <img slot="item-img-active" src="~assets/img/tabbar/分类1.svg" alt="" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path='/cart' activeColor='blue'>
        <img slot="item-img" src="~assets/img/tabbar/购物车1.svg" alt="" />
        <img slot="item-img-active" src="~assets/img/tabbar/购物车.svg" alt="" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
        <img slot="item-img" src="~assets/img/tabbar/我的.svg" alt="" />
        <img slot="item-img-active" src="~assets/img/tabbar/我的1.svg" alt="" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
      
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/TabBar";
import TabBarItem from "components/common/TabBarItem";

export default {
  name: "App",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
@import "./assets/css/base.css";

</style>
