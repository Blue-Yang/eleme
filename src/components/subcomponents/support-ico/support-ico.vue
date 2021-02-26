<template>
  <span class="support-ico" :class="getCls"></span>
</template>

<script>
export default {
  name: 'support-ico',
  props: {
    type: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  computed: {
    getCls(){
      const array = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      return array[this.type] + '_' + this.size;
    }
  }
}
</script>

<style lang="scss">
  @import '../../../assets/css/mixins.scss';
  .support-ico{
    &.decrease_1,&.discount_1, &.special_1, &.invoice_1, &.guarantee_1{
      display: inline-block;
      width: 12px;
      height: 12px;
      background-size: 12px 12px;
    }
    &.decrease_1{
      @include bg-image('img/decrease_1');
    }
    &.discount_1{
      @include bg-image('img/discount_1');
    }
    &.special_1{
      @include bg-image('img/special_1');
    }
    &.invoice_1{
      @include bg-image('img/invoice_1');
    }
    &.guarantee_1{
      @include bg-image('img/guarantee_1');
    }
    &.decrease_2, &.discount_2, &.special_2, &.invoice_2, &.guarantee_2{
      display: inline-block;
      width: 16px;
      height: 16px;
      background-size: 16px 16px;
    }
    &.decrease_2{
      @include bg-image('img/decrease_2');
    }
    &.discount_2{
      @include bg-image('img/discount_2');
    }
    &.special_2{
      @include bg-image('img/special_2');
    }
    &.invoice_2{
      @include bg-image('img/invoice_2');
    }
    &.guarantee_2{
      @include bg-image('img/guarantee_2');
    }
    &.decrease_3, &.discount_3, &.special_3, &.invoice_3, &.guarantee_3{
      display: inline-block;
      width: 12px;
      height: 12px;
      background-size: 12px 12px;
    }
    &.decrease_3{
      @include bg-image('img/decrease_3');
    }
    &.discount_3{
      @include bg-image('img/discount_3');
    }
    &.special_3{
      @include bg-image('img/special_3');
    }
    &.invoice_3{
      @include bg-image('img/invoice_3');
    }
    &.guarantee_3{
      @include bg-image('img/guarantee_3');
    }
    &.decrease_4, &.discount_4, &.special_4, &.invoice_4, &.guarantee_4{
      display: inline-block;
      width: 16px;
      height: 16px;
      background-size: 16px 16px;
    }
    &.decrease_4{
      @include bg-image('img/decrease_4');
    }
    &.discount_4{
      @include bg-image('img/discount_4');
    }
    &.special_4{
      @include bg-image('img/special_4');
    }
    &.invoice_4{
      @include bg-image('img/invoice_4');
    }
    &.guarantee_4{
      @include bg-image('img/guarantee_4');
    }
  }
</style>