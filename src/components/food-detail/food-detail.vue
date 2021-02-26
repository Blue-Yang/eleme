<template>
  <div class="food-detail-wrapper" v-show="detailShow" ref="foodDetailWrapper">
    <div class="food-detail">
      <div class="overview">
        <div class="img-wrapper">
          <img :src="food.image" alt="" height="375px" width="100%" />
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <div class="name">{{ food.name }}</div>
          <div class="sell">
            <span class="count">月售{{ food.sellCount }}份</span>
            <span class="rating-rate">好评率{{ food.rating }}%</span>
          </div>
          <div class="shopping">
            <div class="price">
              <span class="cur-price">￥{{ food.price }}</span>
              <span class="old-price" v-if="food.oldPrice"
                >￥{{ food.oldPrice }}</span
              >
            </div>
            <div class="cart-btn">
              <div class="add-cart" v-if="!food.count" @click="addFirst">
                加入购物车
              </div>
              <cart-control :food="food" v-else @add="addFood"></cart-control>
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h2 class="title">商品介绍</h2>
        <p class="text">{{ food.info }}</p>
      </div>
      <split></split>
      <div class="rating">
        <h2 class="title">商品评论</h2>
        <rating-filter
          :ratings="food.ratings"
          :defaultType="type"
          :onlyContent="onlyContent"
          @selectType="selectType"
          @toggle="toggle"
        >
        </rating-filter>
        <ul>
          <li
            v-for="(rating, index) in food.ratings"
            :key="index"
            class="item"
            v-show="needShow(rating.rateType, rating.text)"
          >
            <div class="desc">
              <span class="time">{{ rating.rateTime | dateFormat}}</span>
              <div>
                <span class="username">{{ rating.username }}</span>
                <img :src="rating.avatar" width="12" height="12" />
              </div>
            </div>
            <div class="comment">
              <i
                :class="{
                  'icon-thumb_up': rating.rateType === 0,
                  'icon-thumb_down': rating.rateType === 1
                }"
              ></i>
              <span class="text">{{ rating.text }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
import CartControl from "components/subcomponents/cart-control/cart-control";
import Split from "components/subcomponents/split/split";
import RatingFilter from "components/subcomponents/rating-filter/rating-filter";

const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
  name: "food-detail",
  props: {
    food: {
      //这里的food在组件创建之后，在goods.vue中点击food时才会传进来，所以一开始是个空对象
      type: Object
    }
  },
  data() {
    return {
      detailShow: false,
      type: POSITIVE,
      onlyContent: true
    };
  },
  methods: {
    show() {
      this.detailShow = true;
      this.$nextTick(() => {
        this.scroll =
          this.scroll ||
          new BetterScroll(this.$refs.foodDetailWrapper, {
            scrollY: true,
            click: true
          });
      });
    },
    hide() {
      this.detailShow = false;
    },
    addFirst(event) {
      this.$set(this.food, "count", 1);
      this.$emit("add", event.target);
    },
    addFood(el) {
      this.$emit("add", el);
    },
    selectType(type) {
      this.type = type;
      this.$nextTick(() => {
        // 当评论列表由少变多时，DOM改变，保证能够正常滚动
        this.scroll.refresh();
      });
    },
    toggle() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        // 当评论列表由少变多时，DOM改变，保证能够正常滚动
        this.scroll.refresh();
      });
    },
    needShow(ratingType, ratingText) {
      if (this.onlyContent && !ratingText) {
        return false;
      }
      if (this.type === ALL) {
        return true;
      }
      return this.type === ratingType;
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
    CartControl,
    Split,
    RatingFilter
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixins.scss";
.food-detail-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 3;
  width: 100%;
  background: #fff;
  .food-detail {
    .overview {
      .img-wrapper {
        position: relative;
        font-size: 0; //消除图片底部间隙
        .back {
          position: absolute;
          left: 0;
          top: 0;
          padding: 10px;
          background: rgba(7, 17, 27, 0.1);
        }
        .icon-arrow_lift {
          font-size: 20px;
          color: #fff;
        }
      }
      .content {
        padding: 18px;
        background: #fff;
        .name {
          margin-bottom: 16px;
          font-size: 14px;
          line-height: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }
        .sell {
          margin-bottom: 18px;
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 157);
          .count {
            margin-right: 12px;
          }
        }
        .shopping {
          display: flex;
          justify-content: space-between;
          .price {
            flex: 1;
            .cur-price {
              font-size: 14px;
              line-height: 24px;
              font-weight: 700;
              color: rgb(240, 20, 20);
            }
            .old-price {
              font-size: 10px;
              line-height: 24px;
              color: rgb(143, 153, 159);
              text-decoration: line-through;
            }
          }
          .cart-btn {
            .add-cart {
              width: 74px;
              padding: 6px 0;
              text-align: center;
              font-size: 10px;
              line-height: 12px;
              color: rgb(255, 255, 255);
              background: rgb(0, 160, 220);
              border-radius: 12px;
            }
          }
        }
      }
    }
    .info {
      padding: 18px;
      background: #fff;
      .title {
        margin-bottom: 6px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
      .text {
        padding: 0 8px;
        font-size: 12px;
        line-height: 24px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      background: #fff;
      .title {
        padding: 18px 18px 0 18px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
      ul {
        padding: 0 18px;
        .item {
          padding: 16px 0;
          @include border-bottom-1px(rgba(7, 17, 27, 0.1));
          .desc {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
            font-size: 10px;
            line-height: 12px;
            color: rgb(147, 153, 157);
            .time {
              flex: 1;
            }
            .username {
              margin-right: 6px;
            }
            img {
              border-radius: 50%;
            }
          }
          .comment {
            .icon-thumb_up {
              margin-right: 4px;
              font-size: 12px;
              line-height: 24px;
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down {
              margin-right: 4px;
              font-size: 12px;
              line-height: 24px;
              color: rgb(143, 157, 159);
            }
            .text {
              font-size: 12px;
              line-height: 16px;
              color: rgb(7, 17, 27);
            }
          }
        }
      }
    }
  }
}
</style>
