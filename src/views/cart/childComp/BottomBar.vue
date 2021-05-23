<template>
  <div id="bottom-bar">
    <div class="bottom-content" >
      <click-botton :is-click='allSelect'  @click.native='checkClick'></click-botton>
      <div style="font-size: 18px">全选</div>
    </div>
    <div class="totalPrice">合计:{{ totalPrice }}</div>
    <div class="toCalcu">结算({{length}})</div>
  </div>
</template>

<script>
import clickBotton from "./ClickBotton";
export default {
  name: "BottomBar",
  components: {
    clickBotton,
  },
  computed: {
    allSelect(){
      // return !(this.$store.state.cartList.filter(item=>!item.checked).length) 效率不高 因为会全部遍历完
      /* 而我需要的是只要有一个不被选中就是false */
      // find() 方法返回通过测试（函数内判断）的数组的第一个值。
      if(this.$store.state.cartList.length ===0)return false
      return !this.$store.state.cartList.find(item=>!item.checked) 
      // find函数对于空数组返回的是undefined
    },
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    length() {
      return this.$store.state.cartList.filter(item=>item.checked).length;
    },
  },
  methods:{
    checkClick(){
      /* 1.情况1: 全部选中变为全不选中 2.情况2：全没选中或部分被选中的变为全选中  */
      if(this.allSelect){ //this.allSelect 为全部选中
        this.$store.state.cartList.forEach(item=>item.checked=false)
      }else{
        this.$store.state.cartList.forEach(item=>item.checked=true)
      }
    }
  }
};
</script>
<style scoped>
#bottom-bar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: rgb(202, 198, 198);
  display: flex;
}
.bottom-content {
  display: flex;
  width: 100px;
}
.toCalcu {
  width: 100px;
  text-align: center;/* 文字居中 */
  background: yellow;
}
.totalPrice {
  flex: 1;
}
</style>