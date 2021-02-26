<template>
  <div class="split"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins.scss';
  .split{
    width: 100%;
    height: 16px;
    background: #f3f5f7;
    @include border-top-1px(rgba(7,17,27,.1));
    @include border-bottom-1px(rgba(7,17,27,.1));
  }
</style>