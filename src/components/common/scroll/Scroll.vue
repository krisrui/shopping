<template>
  <div id="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null, //scroll是个对象  里面有方法
    };
  },
  props:{
    probeType:{
      type:Number,
      default:0 //当数字为3时，一直在监听准备回调 影响性能
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    backTop(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  },
  mounted() {
    //只有挂载的时候才能拿到元素
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click:true, // 这个地方限制了scroll里面的div是否可点击
      probeType : this.probeType,  
      pullUpLoad: true, //是否需要上拉加载更多
    });
    this.scroll.on("scroll", (position) => {
      this.$emit('scrollTo',position)  // 发射的事件为字符串！！！！！！
    });
    this.scroll.on('pullingUp',()=>{
      console.log('上拉加载更多')
      this.$emit('loadMore')
    })
  },
};
</script>
<style scoped>
</style>