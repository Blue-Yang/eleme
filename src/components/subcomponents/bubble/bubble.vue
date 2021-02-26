<template>
  <span class="bubble">
    {{count}}
  </span>
</template>

<script>
export default {
  props: {
    count: {
      type: Number
    }
  }
}
</script>

<style lang='scss' scoped>
  .bubble{
    display: inline-block;
    padding: 0 5px;
    height: 16px;
    border-radius: 16px;
    background-image: linear-gradient(to right,#fc9153,#f01414);
    font-size: 10px;
    line-height: 16px;
    font-weight: 700;
    color: #fff;
    font-family: Helvetica;
    text-align: center;
  }
</style>