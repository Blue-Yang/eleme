<template>
  <div class="rating-filter">
    <div class="type-options">
      <ul v-if="ratings && ratings.length">
        <li @click="selectType(2)" :class="{active: 2===currentType}">
          <span class="text">{{optionsTxt[0]}}</span>
          <span class="count">&nbsp;{{ratings.length}}</span>
        </li>
        <li @click="selectType(0)" :class="{active: 0===currentType}">
          <span class="text">{{optionsTxt[1]}}</span>
          <span class="count">&nbsp;{{positive}}</span>
        </li>
        <li @click="selectType(1)" :class="{active: 1===currentType}">
          <span class="text">{{optionsTxt[2]}}</span>
          <span class="count">&nbsp;{{negtive}}</span>
        </li>
      </ul>
    </div>
    <div class="content-option" @click="toggle">
      <i class="icon-check_circle" 
      :class="{on: localOnlyContent}"
      ></i>
      <span class="txt" >只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
  name: 'rating-filter',
  props: {
    ratings: {
      type: Array
    },
    optionsTxt: {
      type: Array,
      default(){
        return ['全部','推荐','吐槽']
      }
    },
    defaultType: {
      validator: function(value){
        return [ALL, POSITIVE, NEGATIVE].indexOf(value) !== -1;
      },
      default(){
        return ALL;
      }
    },
    onlyContent: {
      type: Boolean,
      default(){
        return false;
      }
    }
  },
  data(){
    return {
      currentType: this.defaultType,
      localOnlyContent: this.onlyContent
    }
  },
  computed: {
    positive(){
      let num = 0;
      this.ratings.forEach(rating => {
        if(rating.rateType === POSITIVE){
          num++;
        }
      })
      return num;
    },
    negtive(){
      let num = 0;
      this.ratings.forEach(rating => {
        if(rating.rateType === NEGATIVE){
          num++;
        }
      })
      return num;
    }
  },
  methods: {
    selectType(type){
      this.$emit('selectType', type);
      this.currentType = type;
    },
    toggle(){
      this.$emit('toggle');
      this.localOnlyContent = !this.localOnlyContent;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins.scss';
  .rating-filter{
    padding: 0 18px;
    border-bottom: 1px solid rgba(7,17,27,.1);
    .type-options{
      padding: 18px 0;
      @include border-bottom-1px;
      ul{
        li{
          display: inline-block;
          margin-right: 8px;
          padding: 8px 12px;
          color: rgb(77,85,93);
          line-height: 16px;
          background: rgba(0,160,220,.2);
          border-radius: 2px;
          &.active{
            color: #fff;
            background: rgb(0,160,220);
          }
          .text{
            font-size: 12px;
          }
          .count{
            font-size: 8px;
          }
          &:last-child{
            background: rgba(77,85,93,.2);
            &.active{
              background: rgb(77,85,93);
            }
          }
        }
      }
    }
    .content-option{
      display: flex;
      align-items: center;
      padding: 12px 0;
      color: rgb(145,153,159);
      line-height: 24px;
      .icon-check_circle{
        margin-right: 4px;
        font-size: 24px;
        &.on{
          color: #00b43c;
        }
      }
      .txt{
        font-size: 12px;
      }
    }
  }

</style>