<template>
  <div id="home">
    <nav-bar class="nav-bgcolor">
      <div slot="left"></div>
      <div slot="middle">购物街</div>
      <div slot="right"></div>
    </nav-bar>

    <!-- 掩耳盗铃 先让你显示在那-->
    <tab-control
      class="tabControlShow"
      @tabClick="tabClick"
      :datas="[
        { id: 0, text: '流行' },
        { id: 1, text: '新款' },
        { id: 2, text: '精选' },
      ]"
      ref="tabControl1"
      v-show="isTabControlFixed"
    >
    </tab-control>
    <!-- 把要滚动的内容放在scroll组件里 自动完成滚动 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrollTo="scrollTo"
      :pull-up-load="true"
      @loadMore="loadMore"
    >
      <swiper>
        <swiper-item v-for="item in banners" :key="item.acm">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad" />
          </a>
        </swiper-item>
      </swiper>

      <recommend :recommends="recommends"></recommend>

      <tab-control
        @tabClick="tabClick"
        :datas="[
          { id: 0, text: '流行' },
          { id: 1, text: '新款' },
          { id: 2, text: '精选' },
        ]"
        ref="tabControl2"
      >
      </tab-control>

      <goods-list :goods="showType"></goods-list>

    </scroll>

    <back-top @click.native="backTop" v-show="isBackToShow"></back-top>
    <!--这是一个单独在外面的组件 组件点击事件要加修饰符 -->
      <!--是否展示 要用v-show -->
  </div>

</template>

<script>
import NavBar from "components/common/NavBar";
import { getHomeMulData } from "network/home";
import Recommend from "./childComps/Recommend";
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem";
import TabControl from "./childComps/TabControl";
import { getHomeGoods } from "network/home";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import {itemListenerMixin} from 'assets/mixIn'
export default {
  name: "Home",
  components: {
    NavBar,
    Recommend,
    Swiper,
    SwiperItem,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isBackToShow: false,
      tabControlTop: undefined,
      isLoad: false,
      isTabControlFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showType() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 完成数据响应式后加载请求数据
    getHomeMulData().then((res) => {
      // console.log(res) 拿到轮播图的数据需要保存下
      this.banners = res.data.banner.list; //这里的this指向created环境中的this
      this.recommends = res.data.recommend.list; // 结果为数组
      console.log(this.banners);
    });
    // console.log(this.result)
    // 这里打印不行 因为是异步操作

    //2.请求商品信息  具体操作放在下面  这里只引用方法
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {

  },
  activated() {
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0); // 积极时滚动到离开时记录的位置
    this.$refs.scroll.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y; //离开时记录当前滚动的位置

    /* 取消全局事件 */
    this.$bus.$off('itemImageLoad',this.itemListener)
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.tabControlTop = this.$refs.tabControl2.$el.offsetTop; //每个组件都有一个$el的属性 获得组件中元素
        this.isLoad = true;
        console.log(this.tabControlTop);
      }
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    scrollTo(position) { // scroll组件传递来的事件里面带有position
      // position为一个对象  里面有x，y属性
      this.isBackToShow = -position.y > 350; /* position实时发生改变  */

      //2.决定tabControl是否吸顶
      this.isTabControlFixed = -position.y > this.tabControlTop;
    },
    backTop() {
      //  获得到子组件 再获得到子组件的属性
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
    tabClick(index) {
      //根据tabControl不同的索引 更新内容
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      //同步索引值  很6
      this.$refs.tabControl2.currentData = index;
      this.$refs.tabControl1.currentData = index;
    },

    /* 网络请求相关 */
    getHomeGoods(type) {
      //每次请求 page+1 不写死！
      const page = this.goods[type].page + 1;
      
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page;

        this.$refs.scroll.finishPullUp(); //继续可以上拉加载
         this.$refs.scroll.scroll.refresh(); 
      });
    },
  },
};
</script>
<style scoped>
#home {
  position: relative;
  padding-top: 44px;

  height: 100vh; /* 100%视口的宽度  */
  box-sizing: border-box;
}

.nav-bgcolor {
  background: pink;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.tabControlShow {
  position: relative;
  z-index: 10;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style> 