<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <tab></tab>
    <transition name="move" mode="out-in">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </transition>
    
  </div>
</template>

<script>
import {getSeller} from 'api'
import Header from './components/header/header.vue'
import Tab from './components/tab/tab.vue'
export default {
  data(){
    return {
      seller: {}
    }
  },
  created(){
    getSeller().then(data => {
      this.seller = data;
    })
  },
  components: {
    "v-header": Header, // 不准用header
    Tab
  }
}
</script>

<style lang="scss">
  .move-enter{
    // transform: translateX(100%);
    opacity: 0;
  }
  .move-leave-to{
    // transform: translateX(-100%);
    opacity: 0;
  }
  .move-enter-active, .move-leave-active{
    transition: opacity .2s cubic-bezier(.17,.67,.83,.67);
  }
</style>
