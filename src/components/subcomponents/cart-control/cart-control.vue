<template>
  <div class="cart-control-wrapper">
    <div class="remove-icon">
      <transition name="icon">
        <i class="icon-remove_circle_outline" @click="decrease"  v-if="food.count"></i>
      </transition>
      <span class="count"  v-if="food.count">{{food.count}}</span>
    </div>
    <i class="icon-add_circle" @click.stop="add"></i>
  </div>
</template>

<script>
export default {
  name: 'cart-control',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    add(event){
      if(this.food.count){
        this.food.count ++;
      }else{
        // this.food.count = 1;
        this.$set(this.food, 'count', 1);
      }
      this.$emit('add', event.target);
    },
    decrease(){
      if(this.food.count){
        this.food.count--;
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .icon-enter, .icon-leave-to{
    transform: translateX(36px) rotate(180deg);
    opacity: 0;
  }
  .icon-enter-active, .icon-leave-active{
    transition: all .4s linear;
    
  }
  .cart-control-wrapper{
    display: flex;
    align-items: center;
    .remove-icon{
      display: flex;
      align-items: center;
      width: 48px;
      height: 24px;
    }
    i{
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
    }
    .count{
      display: inline-block;
      width: 24px;
      text-align: center;
      font-size: 10px;
      line-height: 24px;
      color: rgb(147, 153, 159);
    }
  }
</style>