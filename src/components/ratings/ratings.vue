<template>
  <div class="ratings-wrapper" ref="ratingWrapper">
    <div class="ratings">
      <div class="overview">
        <div class="general">
          <span class="score">{{ seller.score }}</span>
          <span class="text">综合评分</span>
          <span class="comparison">高于周边商家{{ seller.rankRate }}%</span>
        </div>
        <div class="detail">
          <div class="service">
            <span class="text">服务态度</span>
            <star :score="seller.serviceScore" :size="36"></star>
            <span class="service-score">{{ seller.serviceScore }}</span>
          </div>
          <div class="food">
            <span class="text">商品评分</span>
            <star :score="seller.foodScore" :size="36"></star>
            <span class="food-score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery">
            <span class="text">送达时间</span>
            <span class="time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="ratings">
        <rating-filter
          :ratings="ratings"
          :options-txt="['全部', '满意', '不满意']"
          :defaultType="type"
          :onlyContent="onlyContent"
          @selectType="selectType"
          @toggle="toggle"
        ></rating-filter>
        <ul class="list">
          <li 
            v-for="(item, index) in ratings" 
            :key="index" class="item"
            v-if="needShow(item.rateType, item.text)"
            >
            <div class="left">
              <img :src="item.avatar" width="28" height="28" class="avatar" />
            </div>
            <div class="right">
              <div class="info">
                <div class="info-left">
                  <div class="userName">
                    {{ item.username }}
                  </div>
                  <div class="order-info">
                    <star :score="item.score" :size="24" class="star"></star>
                    <span v-if="item.deliveryTime" class="time"
                      >{{ item.deliveryTime }}分钟送达</span
                    >
                  </div>
                </div>
                <div class="rate-time">
                  {{item.rateTime | dateFormat}}
                </div>
              </div>
              <div class="content">
                {{ item.text }}
              </div>
              <div
                class="recommend"
                v-if="item.recommend && item.recommend.length"
              >
                <i class="icon-thumb_up"></i>
                <span
                  v-for="(rec, index) in item.recommend"
                  :key="index"
                  class="rec-item"
                >
                  {{ item.recommend[index] }}
                </span>
              </div>
            </div>
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
import RatingFilter from "components/subcomponents/rating-filter/rating-filter";
const ALL = 2;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      type: ALL,
      onlyContent: true
    };
  },
  created() {
    getRatings().then(ratings => {
      this.ratings = ratings;
      this.$nextTick(() => {
        this._initScroll();
      });
    });
  },
  methods: {
    _initScroll() {
      this.scroll = new BetterScroll(this.$refs.ratingWrapper, {
        scrollY: true,
        click: true
      });
    },
    needShow(rateType, rateText){
      if(this.onlyContent && !rateText){
        return false;
      }
      if(this.type === ALL){
        return true;
      }
      return rateType === this.type;
    },
    selectType(type){
      this.type = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    },
    toggle(){
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    }
  },
  filters: {
    dateFormat(value) {
      function addForwardZero(time) {
        if (time.toString().length === 1) {
          return "0" + time;
        } else {
          return time;
        }
      }
      const time = new Date(value),
        year = time.getFullYear(),
        month = addForwardZero(time.getMonth() + 1),
        date = addForwardZero(time.getDate()),
        hours = addForwardZero(time.getHours()),
        minutes = addForwardZero(time.getMinutes());
      return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
    }
  },
  components: {
    Split,
    Star,
    RatingFilter
  }
};
</script>

<style lang="scss">
@import "../../assets/css/mixins.scss";
.ratings-wrapper {
  position: absolute; // 为了限定高度，让betterScoll生效
  top: 176px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;
  .overview {
    display: flex;
    padding: 18px 24px 18px 0;
    .general {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @include border-right-1px(rgba(7, 17, 27, 0.3));
      .score {
        margin-bottom: 6px;
        font-size: 24px;
        line-height: 28px;
        color: rgb(255, 153, 0);
      }
      .text {
        margin-bottom: 8px;
        font-size: 12px;
        line-height: 12px;
        color: rgb(7, 17, 27);
      }
      .comparison {
        margin-bottom: 6px;
        font-size: 10px;
        line-height: 10px;
        color: rgba(7, 17, 27, 0.6);
      }
    }
    .detail {
      padding-left: 24px;
      .text {
        font-size: 12px;
        line-height: 18px;
        color: rgb(7, 17, 27);
        margin-right: 12px;
      }
      .service {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .service-score {
          margin-left: 6px;
          font-size: 12px;
          line-height: 18px;
          color: rgb(255, 153, 0);
        }
      }
      .food {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .food-score {
          margin-left: 6px;
          font-size: 12px;
          line-height: 18px;
          color: rgb(255, 153, 0);
        }
      }
      .delivery {
        display: flex;
        align-items: center;
        .time {
          font-size: 12px;
          line-height: 18px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .ratings {
    .list {
      padding: 0 18px;
      .item {
        padding: 18px 0;
        display: flex;
        @include border-bottom-1px;
        .left {
          .avatar {
            margin-right: 12px;
            border-radius: 50%;
          }
        }
        .right {
          flex: 1;
          .info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
            font-size: 10px;
            line-height: 12px;
            .info-left {
              flex: 1;
              .username {
                margin-bottom: 4px;
                color: rgb(7, 17, 27);
              }
              .order-info {
                display: flex;
                align-items: center;
                .star {
                  margin-right: 6px;
                }
                .time {
                  color: rgb(147, 153, 159);
                }
              }
            }

            .rate-time {
              color: rgb(147, 153, 159);
            }
          }
          .content {
            margin-bottom: 8px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }
          .recommend {
            .icon-thumb_up {
              margin-right: 8px;
              font-size: 12px;
              line-height: 16px;
              color: rgb(0, 160, 220);
            }
            .rec-item {
              display: inline-block;
              margin: 0 8px 4px 0;
              padding: 0 6px;
              font-size: 9px;
              line-height: 16px;
              color: rgb(147, 153, 159);
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
