<template>
  <div id="detail">
    <nav-bar>
      <div slot="middle" class="detail-item">
        <span
          v-for="(item, index) in titles"
          :key="index"
          @click="detailItemClick(index)"
          :class="{ active: currentIndex == index }"
          >{{ item }}</span
        >
      </div>
      <div slot="left" class="left" @click="leftClick">
        <img src="~assets/img/back/back.jpg" alt="" />
      </div>
    </nav-bar>

    <scroll class="content" ref="scroll" @scrollTo="scrollToY" :probe-type="3">
      <detail-swiper :swiper-datas="topImages"></detail-swiper>

      <introduce :goodsInfos="goodsInfo" ref="params"></introduce>

      <show-picture
        :picture="showPictures"
        @imgLoaded="imageLoaded"
      ></show-picture>

      <div class="nowTime" ref="comments">{{ nowTime | showDate }}</div>
      <!-- 使用一下过滤器 -->

      <goods-list :goods="recommendsInfo" ref="goods"></goods-list>
    </scroll>

    <bottom-nar @addToCart="addTCart"></bottom-nar>

    <back-top @click.native="backTop" v-show="isBackToShow"></back-top>
    <!-- toast吐司 冒烟 弹窗 -->
    <!-- <toast :is-show="isShow" :message="message"></toast> -->
  </div>
</template>

<script>
import { formatDate } from "assets/tools";
import NavBar from "components/common/NavBar";
import { getDetailDatas, goodsInfo, getRecommends } from "network/detail";
import DetailSwiper from "./DetailSwiper";
import Introduce from "./childComp/Introduce";
import Scroll from "components/common/scroll/Scroll";
import ShowPicture from "./childComp/ShowPicture";
import GoodsList from "components/content/goods/GoodsList";
import { itemListenerMixin } from "assets/mixIn";
import BottomNar from "./childComp/BottomNar";
import { backTopMixin } from "assets/mixIn";
import { mapActions } from "vuex";
// import Toast from "components/common/toast/Toast";

export default {
  name: "Detail",
  components: {
    NavBar,
    DetailSwiper,
    Introduce,
    Scroll,
    ShowPicture,
    GoodsList,
    BottomNar,
    // Toast,
  },
  mixins: [itemListenerMixin, backTopMixin],
  filters: {
    showDate(value) {
      // const date = new Date(value*1000);
      return formatDate("yyyy-MM-dd hh:mm:ss");
    },
  },
  created() {
    this.iid = this.$route.params.iid; //获取到活跃路由 路径中传入的参数
    console.log(this.$route);
    // 第二种 this.$route.params.query 通过query传入参数
    // 根据参数请求数据
    getDetailDatas(this.iid).then((res) => {
      this.topImages = res.result.itemInfo.topImages;
      const data = res.result;
      console.log(data);
      this.goodsInfo = new goodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      ); //把你需要的数据整合
      this.price = data.itemInfo.lowNowPrice;
      this.nowTime = data.rate.list[0].created;
      this.showPictures = data.detailInfo.detailImage[0].list;

      getRecommends().then((res) => {
        this.recommendsInfo = res.data.list;
      });
    });
  },
  data() {
    return {
      iid: null,
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      topImages: [],
      goodsInfo: {},
      showPictures: [],
      nowTime: 2046,
      recommendsInfo: [],
      clickRemoveY: [],
      scrollY: undefined,
      price: 0,
      // isShow: false,
      // message: "",
    };
  },
  methods: {
    ...mapActions(["addToCart"]), //映射vuex中actions

    addTCart() {
      const product = {};
      product.image = this.topImages[0]; //图片
      product.title = this.goodsInfo.title; //标题
      product.price = this.price;
      product.iid = this.iid;
      console.log(product);

      // this.$store.state.cartList.push(product) 必须通过mutations
      // this.$store.commit('addToCart', product);
      this.$store.dispatch("addToCart", product).then(res => {
        // this.message = res;
        // this.isShow = true;
        // setTimeout(() => {
        //   this.isShow = false;
        // }, 1500);
        this.$toast.show(res,2000) //5s
      });
      /* dispatch返回的是一个promise */
    },
    scrollToY(position) {
      this.scrollY = -position.y;
      // 根据滚动的y和主题中的值对比更改currentIndex的值
      /* 1.  for(let i = 0;i<this.clickRemoveY.length;i++){
        if(this.currentIndex !== i && (this.scrollY>this.clickRemoveY[i] && this.scrollY<this.clickRemoveY[i+1])||(i === this.clickRemoveY.length-1 && this.scrollY > this.clickRemoveY[i])){ //i+1可能会超出范围
            this.currentIndex = i;
        }
      } */
      /*2. hack代码*/
      for (let i = 0; i < this.clickRemoveY.length - 1; i++) {
        // -1的目的 最后一个最大值不要取到
        if (
          this.currentIndex !== i &&
          this.scrollY > this.clickRemoveY[i] &&
          this.scrollY < this.clickRemoveY[i + 1]
        ) {
          this.currentIndex = i;
        }
      }

      this.isBackToShow = -position.y > 350; /* position实时发生改变  */
    },
    detailItemClick(index) {
      this.currentIndex = index;
      this.$refs.scroll.scroll.scrollTo(0, -this.clickRemoveY[index], 200);
    },
    leftClick() {
      this.$router.back();
    },
    imageLoaded() {
      console.log("图片加载完成");
      this.$refs.scroll.scroll.refresh();

      this.clickRemoveY = [];
      this.clickRemoveY.push(0);
      this.clickRemoveY.push(this.$refs.params.$el.offsetTop);
      this.clickRemoveY.push(this.$refs.comments.offsetTop);
      this.clickRemoveY.push(this.$refs.goods.$el.offsetTop);
      this.clickRemoveY.push(Number.MAX_VALUE); //占用点小内存 放个最大值 生成一个区间
    },
  },
  updated() {},
  destroyed() {
    /* 这个组件没有用keep-alive  */
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 10; /* 把底部的导航栏盖住了 */
  background: white;
  height: 100vh;
}
.detail-item {
  position: relative;
  display: flex;
  justify-content: space-around;
  z-index: 11;
  background: white;
}
.active {
  color: red;
}
.left img {
  width: 44px;
  height: 44px;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>