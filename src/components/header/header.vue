<template>
  <div class="header">
    <div class="content-wrapper" @click="showDetail">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports && seller.supports.length">
          <support-ico :size="1" :type="seller.supports[0].type"></support-ico>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports && seller.supports.length">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin"  @click="showDetail">
      <span class="bulletin-icon"></span>
      <span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="header-detail">
      <header-detail :seller="seller" ref="headerDetail"></header-detail>
    </div>
  </div>
</template>

<script>

import SupportIco from '../subcomponents/support-ico/support-ico'
import HeaderDetail from 'components/header-detail/header-detail'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    url(){
      return 'url(' + this.seller.avatar + ')'
    },
    showDetail(){
      this.$refs.headerDetail.show();
    }
  },
  components: {
    SupportIco,
    HeaderDetail
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixins.scss';
.header{
  position: relative;
  color: rgb(255,255,255);
  .content-wrapper{
    position: relative;
    display: flex;
    align-items: center;
    padding: 24px 12px 18px 24px;
    background: rgba(7,17,27,0.5);
    .avatar{
      margin-right: 16px;
      img{
        border-radius: 4px;
      }
    }
    .content{
      .title{
        .brand{
          display: inline-block;
          margin-right: 6px;
          width: 30px;
          height: 18px;
          vertical-align: top;
          @include bg-image('brand');
          background-size: 30px 18px;
        }
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .description{
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 5px;
      }
      .supports{
        font-size: 10px;
        line-height: 12px;
        display: flex;
        align-items: center;
        .support-ico{
          margin-right: 4px;
        }
      }
    }
    .support-count{
      position: absolute;
      right: 12px;
      bottom: 24px;
      padding: 0 8px;
      display: flex;
      align-items: center;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      .count{
        margin-right: 2px;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right{
        font-size: 12px;
        line-height: 24px;
      }
    }
  }
  .bulletin{
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 28px;
    line-height: 28px;
    background: rgba(7,17,27,0.6);
    .bulletin-icon{
      flex: 0 0 22px;
      width: 22px;
      height: 12px;
      @include bg-image('bulletin');
      background-size: 22px 12px;
    }
    .text{
      margin: 0 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right{
      flex: 0 0 12px;
      font-size: 12px;
    }
  }
  .background{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(10px);
  }
}
</style>
