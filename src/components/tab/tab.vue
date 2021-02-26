<template>
  <div class="tab">
    <router-link to="/goods" tag='div'>商品</router-link>
    <router-link to="/ratings" tag='div'>评价</router-link>
    <router-link to="/seller" tag='div'>商家</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .tab{
    display: flex;
    box-sizing: border-box;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    color: rgb(77,85,93);
    background: rgb(255,255,2555);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){
      border-bottom: 0.5px solid rgba(7,17,27,0.1);
    }
    
    div{
      flex: 1;
      &.router-link-active{
        color: rgb(240,20,20);
      }
    }
  }
</style>