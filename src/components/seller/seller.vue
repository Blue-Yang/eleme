<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="seller">
      <div class="card overview">
        <h2 class="title">{{seller.name}}</h2>
        <div class="sell">
          <star :score="seller.score" :size="36"></star>
          <span class="ratings-count">({{ratingsLength}})</span>
          <span>月售{{seller.sellCount}}单</span>
        </div>
        <div class="rule">
          <div class="rule-item">
            <div class="rule-title">起送价</div>
            <div class="rule-detail">
              <span class="number">{{seller.minPrice}}</span>元
            </div>
          </div>
          <div class="rule-item">
            <div class="rule-title">商家配送</div>
            <div class="rule-detail">
              <span class="number">{{seller.deliveryPrice}}</span>元
            </div>
          </div>
          <div class="rule-item">
            <div class="rule-title">平均配送时间</div>
            <div class="rule-detail">
              <span class="number">{{seller.deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
        <div class="favorite" @click="addToFavorite">
          <div class="icon">
            <i class="icon-favorite" :class="{'on':favorite}"></i>
          </div>
          <div class="favorite-text">
            {{favorite?'已收藏':'收藏'}}
          </div>
        </div>
      </div>
      <split></split>
      <div class="card bulletin">
        <h2 class="title">公告与活动</h2>
        <p class="text">{{seller.bulletin}}</p>
        <ul class="list" v-if="seller.supports && seller.supports.length">
          <li class="item"
            v-for="(support, index) in seller.supports"
            :key="index"
          >
            <support-ico :type="support.type" :size="4" class="support-icon"></support-ico>
            <span>{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="card piture">
        <h2 class="title">商家实景</h2>
        <div class="piture-wrapper" ref="pitureWrapper">
          <ul v-show="seller.pics && seller.pics.length" class="piture-list">
            <li v-for="(src,index) in seller.pics" :key="index" class="piture-item">
              <img :src="src" width="120" height="90">
            </li>
          </ul>
        </div>
        
      </div>
      <split></split>
      <div class="card info">
        <h2 class="title">商家信息</h2>
        <ul class="list">
          <li class="item" 
            v-for="(info,index) in seller.infos" 
            :key="index"
          >
          {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings } from "api";
import BetterScroll from "better-scroll";
import Split from "components/subcomponents/split/split";
import Star from "components/subcomponents/star/star";
import SupportIco from "components/subcomponents/support-ico/support-ico";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data(){
    return {
      ratingsLength: 0,
      favorite: true
    }
  },
  created(){
    getRatings().then(ratings => {
      this.ratingsLength = ratings.length;
    });
  },
  mounted(){
    // console.log(111); 先mounted钩子函数执行了，seller后面才传入
    this.$nextTick(() => {
      this._initScroll();
    })
  },
  methods: {
    addToFavorite(){
      this.favorite = !this.favorite;
    },
    _initScroll(){
      if(!this.pageScroll){
        this.pageScroll = new BetterScroll(this.$refs.sellerWrapper, {
          scrollY: true,
          click: true
        });
      }else{
        this.pageScroll.refresh();
      }
      if(!this.pitureScroll){
        this.pitureScroll = new BetterScroll(this.$refs.pitureWrapper, {
          scrollX: true,
          click: true
        })
      }else{
        this.pitureScroll.refresh();
      }
    }
  },
  watch: {
    seller(){
      // console.log(222);  先mounted钩子函数执行了，seller后面才传入
      this.$nextTick(() => {
        this._initScroll();
      })
    }
  },
  components: {
    Split,
    Star,
    SupportIco
  }
}
</script>

<style lang="scss">
@import "../../assets/css/mixins.scss";
.seller-wrapper{
  position: absolute;
  top: 176px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .seller{
    .card{ // 公共样式
      padding: 18px;
      .title{
        font-size: 14px;
        line-height: 14px;
        // font-weight: 200;
        color: rgb(7,17,27);
      }
      &.overview, &.bulletin{
        .title{
          margin-bottom: 8px;
        }
      }
      &.info, &.piture{
        .title{
          margin-bottom: 12px;
        }
      }
      .list{
        .item{
          padding: 16px 12px;
          font-size: 12px;
          line-height: 16px;
          color: rgb(7,17,27);
          @include border-bottom-1px;
          &:first-child{
            @include border-top-1px;
          }
          &:last-child::after{
            display: none;
          }
        }
      }
    }
    .overview{
      position: relative;
      .sell{
        display: flex;
        align-items: center;
        padding-bottom: 18px;
        font-size: 10px;
        line-height: 18px;
        color: rgb(77,85,93);
        @include border-bottom-1px;
        .ratings-count{
          margin: 0 12px 0 8px;
        }
      }
      .rule{
        display: flex;
        padding: 18px 0 0 0;
        .rule-item{
          flex: 1;
          text-align: center;
          @include border-right-1px;
          &:last-child::after{
            display: none;
          }
          .rule-title{
            margin-bottom: 4px;
            font-size: 10px;
            line-height: 10px;
            color: rgb(147,153,159);
          }
          .rule-detail{
            font-size: 10px;
            line-height: 24px;
            font-weight: 200;
            color: rgb(7,17,27);
            .number{
              font-size: 24px;
            }
          }
        }
        
      }
      .favorite{
        position: absolute;
        top: 18px;
        right: 18px;
        width: 36px;
        height: 35px;
        .icon{
          text-align: center;
          .icon-favorite{
            margin-bottom: 4px;
            font-size: 24px;
            line-height: 24px;
            color: #ccc;
            &.on{
              color: rgb(240,20,20);
            }
          }
        }
        .favorite-text{
          text-align: center;
          font-size: 10px;
          line-height: 10px;
          color: rgb(77,85,93);
        }
      }
    }
    .bulletin{
      .text{
        margin-bottom: 16px;
        padding: 0 12px;
        font-size: 12px;
        line-height: 24px;
        color: rgb(240,20,20);
      }
      .support-icon{
        margin-right: 6px;
        vertical-align: top;
      }
    }
    .piture{
      .piture-wrapper{
        white-space: nowrap;
        .piture-list{
          display: inline-block;
          .piture-item{
            display: inline-block;
            margin-right: 6px;
            font-size: 0px;
          }
        }
      }
    }
  }
}
</style>