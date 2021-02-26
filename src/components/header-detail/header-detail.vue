<template>
  <div class="header-detail-wrapper" v-if="visible">
    <div class="content-wrapper">
      <h1 class="name">{{ seller.name }}</h1>
      <star :score="4.5" :size="48"></star>
      <div class="title">
        <span class="line"></span>
        <span class="text">商家信息</span>
        <span class="line"></span>
      </div>
      <ul class="supports" v-if="seller.supports && seller.supports.length">
        <li
          class="support-item"
          v-for="(item, index) in seller.supports"
          :key="index"
        >
          <support-ico :type="item.type" :size="2"></support-ico>
          <span class="desc">{{ item.description }}</span>
        </li>
      </ul>
      <div class="title">
        <span class="line"></span>
        <span class="text">商家公告</span>
        <span class="line"></span>
      </div>
      <div class="bulletin">
        {{ seller.bulletin }}
      </div>
      <div class="close">
        <i class="icon-close" @click="close"></i>
      </div>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import Star from "components/subcomponents/star/star.vue";
import SupportIco from "components/subcomponents/support-ico/support-ico.vue";

export default {
  name: "header-detail",
  props: {
    seller: {
      type: Object
    }
  },
  data(){
    return {
      visible: false
    }
  },
  methods: {
    show(){
      this.visible = true;
    },
    close(){
      this.visible = false;
    }
  },
  components: {
    Star,
    SupportIco
  }
};
</script>

<style lang="scss" scoped>
.header-detail-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: rgb(255, 255, 255);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  .content-wrapper {
    padding: 64px 36px 0 36px;
    .name {
      margin-bottom: 16px;
      font-size: 16px;
      line-height: 16px;
      font-weight: 700;
      text-align: center;
    }
    .star-wrapper {
      margin-bottom: 28px;
      height: 24px;
    }
    .title {
      display: flex;
      margin-bottom: 24px;
      font-size: 14px;
      line-height: 14px;
      font-weight: 700;
      .line {
        flex: 1;
        position: relative;
        top: -6px;
        display: inline-block;
        border-bottom: 2px solid rgba(255, 255, 255, 0.2);
      }
      .text {
        margin: 0 12px;
      }
    }
    .supports {
      padding-left: 12px;
      margin-bottom: 28px;
      .support-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        .desc {
          margin-left: 6px;
          font-size: 12px;
          line-height: 12px;
        }
      }
    }
    .bulletin {
      padding: 0 12px;
      font-size: 12px;
      line-height: 24px;
    }
    .close {
      position: absolute;
      bottom: 32px;
      left: 50%;
      margin-left: -16px;
      .icon-close {
        font-size: 32px;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.8);
    }
  }
}
</style>
