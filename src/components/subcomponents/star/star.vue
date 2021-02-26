<template>
  <div class="star-wrapper">
    <span v-for="(item, index) in itemClasses" :key="index" class="star" :class="item"></span>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    score: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  computed: {
    itemClasses(){
      const score =  Math.floor(this.score * 2) / 2;
      const integer = Math.floor(score);
      let hasDecimal = score % 1 !== 0;
      const ret = new Array(5);
      for(let i = 0; i < ret.length; i++){
        if(i < integer){
          ret[i] = 'star' + this.size + '_' + 'on'
        }else if(hasDecimal){
          ret[i] = 'star' + this.size + '_' + 'half'
          hasDecimal = true;
        }else{
          ret[i] = 'star' + this.size + '_' + 'off'
        }
      }
      return ret;
    },

  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/mixins.scss';
.star-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  .star{
    display: inline-block;
    &:last-child{
      margin-right: 0 !important;
    }
    &.star24_on, &.star24_half, &.star24_off{
      margin-right: 3px;
      width: 10px;
      height: 10px;
      background-size: 10px 10px;
    }
    &.star24_on{
      @include bg-image('img/star24_on');
    }
    &.star24_half{
      @include bg-image('img/star24_half');
    }
    &.star24_off{
      @include bg-image('img/star24_off');
    }
    &.star36_on, &.star36_half, &.star36_off{
      margin-right: 6px;
      width: 15px;
      height: 15px;
      background-size: 15px 15px;
    }
    &.star36_on{
      @include bg-image('img/star36_on');
    }
    &.star36_half{
      @include bg-image('img/star36_half');
    }
    &.star36_off{
      @include bg-image('img/star36_off');
    }
    &.star48_on, &.star48_half, &.star48_off{
      margin-right: 22px;
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
    }
    &.star48_on{
      @include bg-image('img/star48_on');
    }
    &.star48_half{
      @include bg-image('img/star48_half');
    }
    &.star48_off{
      @include bg-image('img/star48_off');
    }
  }
}
  
</style>