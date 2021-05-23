<template>
 <div class='introduce'>
     <div class="info-title">{{goodsInfos.title}}</div>
     <div class="other-info">
        <span>{{goodsInfos.columns[0]}}</span> 
         <span>{{goodsInfos.columns[1]}}</span>
     </div>
     <div class="info-services">
          <span v-for="index in (goodsInfos.services.length)" :key="index">
             <img :src="goodsInfos.services[index-1].icon" alt="">
             <span>{{goodsInfos.services[index-1].name}}</span>
         </span> 
     </div>
 </div>
</template>

<script>
export default {
  name: 'Introduce',
  props:{
      goodsInfos:{
          type:Object,
          default(){
              return {}
          }
      }
  }
}

</script>
<style scoped>
.info-services{
    font-size:14px
}
.info-services img{
    width: 30px;
    vertical-align: middle;
}
</style>