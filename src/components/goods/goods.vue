<template>
  <div class="goods-wrapper">
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul class="menu">
          <li
            v-for="(item, index) in goods"
            :key="index"
            class="menu-item"
            :class="currentIndex === index ? 'active' : ''"
            ref="menuItems"
            @click="menuItemHandler(index)"
          >
            <div class="text-wrapper">
              <div class="text">
                <span>
                  <support-ico
                    v-if="item.type > 0"
                    :type="item.type"
                    :size="3"
                  ></support-ico
                  >{{ item.name }}
                </span>
                <bubble
                  class="categry-count"
                  v-if="categryCountList[index]"
                  :count="categryCountList[index]"
                ></bubble>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <div class="foods">
          <div
            class="foods-item"
            ref="foodsItem"
            v-for="(item, index) in goods"
            :key="index"
          >
            <div class="foods-title">
              <h3>{{ item.name }}</h3>
            </div>
            <ul class="foods-list">
              <li
                v-for="(food, index) in item.foods"
                :key="index"
                class="food-item"
                @click="showFoodDetail(food)"
              >
                <div class="avatar">
                  <img :src="food.icon" alt="" width="57" height="57" />
                </div>
                <div class="food-content">
                  <div class="food-name">{{ food.name }}</div>
                  <div class="food-desc">{{ food.description }}</div>
                  <div class="food-sell">
                    <span class="sell-count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="food-price">
                    <span class="price">￥{{ food.price }}</span>
                    <span class="old-price" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @add="addFood"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart
        :selectedFoods="selectedFoods"
        :deliveryPrice="seller.deliveryPrice"
        :minPrice="seller.minPrice"
        ref="shopCart"
      ></shop-cart>
    </div>
    <div class="food-detail-wrapper">
      <food-detail
        ref="foodDetail"
        :food="selectFood"
        @add="addFood"
      ></food-detail>
    </div>
  </div>
</template>

<script>
import { getGoods } from "api";
import BetterScroll from "better-scroll";
import SupportIco from "components/subcomponents/support-ico/support-ico";
import Bubble from "components/subcomponents/bubble/bubble";
import CartControl from "components/subcomponents/cart-control/cart-control";
import ShopCart from "components/shop-cart/shop-cart";
import FoodDetail from "components/food-detail/food-detail";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      foodsListHeight: [],
      scrollY: 0,
      categryCountList: [],
      selectFood: {}
    };
  },
  created() {
    this.fetch();
    this.$watch(
      "goods",
      () => {
        this.goods.forEach((categry, index) => {
          let categryCount = 0;
          categry.foods.forEach(food => {
            if (food.count) {
              categryCount += food.count;
            }
          });
          this.categryCountList.splice(index, 1, categryCount);
        });
      },
      { deep: true }
    );
  },
  methods: {
    fetch() {
      getGoods().then(res => {
        this.goods = res;
        this.$nextTick(() => {
          this.initScroll();
          this.caculateHeight();
        });
      });
    },
    initScroll() {
      this.menuScroll = new BetterScroll(this.$refs.menuWrapper, {
        scrollY: true,
        click: true
      });
      this.foodsScroll = new BetterScroll(this.$refs.foodsWrapper, {
        scrollY: true,
        click: true,
        probeType: 3
      });
      this.foodsScroll.on("scroll", pos => {
        if (pos.y <= 0) {
          this.scrollY = Math.abs(pos.y);
        }
      });
    },
    caculateHeight() {
      let height = 0;
      this.foodsListHeight.push(height);
      let foodsItem = this.$refs.foodsItem;
      for (var i = 0, len = this.$refs.foodsItem.length; i < len; i++) {
        height += foodsItem[i].clientHeight;
        this.foodsListHeight.push(height);
      }
    },
    followScroll(index) {
      // menu跟随滚动
      let el = this.$refs.menuItems[index];
      this.menuScroll.scrollToElement(el, 300, 0, -100);
    },
    menuItemHandler(index) {
      //点击菜单时，foods列表滚动
      this.foodsScroll.scrollTo(0, -this.foodsListHeight[index], 300);
    },
    addFood(el) {
      //增加food时，通知shopcart做小球运动
      this.$refs.shopCart.drop(el);
    },
    showFoodDetail(food) {
      this.selectFood = food;
      this.$refs.foodDetail.show();
    }
  },
  computed: {
    currentIndex() {
      // menu菜单高亮索引
      const len = this.foodsListHeight.length;
      for (let i = 0; i < len; i++) {
        let height1 = this.foodsListHeight[i];
        let height2 = this.foodsListHeight[i + 1];
        // 考虑最后一个边界情况
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this.followScroll(i); // menu跟随滚动
          return i;
        }
      }
      return 0;
    },
    selectedFoods() {
      let ret = [];
      this.goods.forEach(item => {
        item.foods.forEach(food => {
          if (food.count) {
            ret.push(food);
          }
        });
      });
      return ret;
    }
  },
  components: {
    SupportIco,
    ShopCart,
    CartControl,
    Bubble,
    FoodDetail
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixins.scss";

.goods-wrapper {
  position: absolute;
  top: 176px;
  bottom: 0px;
  width: 100%;
  .goods {
    position: absolute;
    top: 0;
    bottom: 48px;
    width: 100%;
    display: flex;
    overflow: hidden;
    .menu-wrapper {
      height: 100%; // 滚动容器的高度要小于内容的高度，才能滚动
      width: 80px;
      .menu {
        background: #f3f5f7;
        overflow: hidden;
        .menu-item {
          padding: 0 12px;
          display: table;
          width: 56px;
          height: 54px;
          font-size: 12px;
          line-height: 14px;
          text-align: center;
          color: #666;
          @include border-bottom-1px;
          &::after {
            width: 56px;
            left: 12px;
          }
          &:last-child {
            //打两个冒号不行？
            &::after {
              display: none;
            }
          }
          &.active {
            background: rgb(255, 255, 255);
            &::after {
              display: none;
            }
          }
          .text-wrapper {
            display: table-cell;
            vertical-align: middle;
            .text {
              position: relative;
              .support-ico {
                margin-right: 2px;
              }
              .categry-count {
                position: absolute;
                top: -9px;
                right: -10px;
              }
            }
          }
        }
      }
    }
    .foods-wrapper {
      height: 100%;
      flex: 1;
      .foods-title {
        height: 26px;
        font-size: 12px;
        line-height: 26px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
        h3 {
          margin-left: 14px;
        }
      }
      .food-item {
        margin: 18px 18px 0 18px;
        padding-bottom: 18px;
        display: flex;
        position: relative;
        @include border-bottom-1px;
        &:last-child {
          &::after {
            display: none;
          }
        }
        .avatar {
          margin-right: 10px;
          img {
            border-radius: 2px;
          }
        }
        .food-content {
          padding-top: 2px;
          .food-name {
            margin-bottom: 8px;
            font-size: 14px;
            line-height: 14px;
            color: rgb(7, 17, 27);
          }
          .food-desc,
          .food-sell {
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
          }
          .food-desc {
            width: 180px;
            margin-bottom: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .food-sell {
            .sell-count {
              margin-right: 12px;
            }
          }
          .food-price {
            .price {
              margin-right: 8px;
              font-size: 14px;
              line-height: 24px;
              color: rgb(240, 20, 20);
              font-weight: 700;
            }
            .old-price {
              font-size: 10px;
              line-height: 24px;
              color: rgb(147, 153, 159);
              font-weight: 700;
              text-decoration: line-through;
            }
          }
        }
        .cart-control-wrapper {
          position: absolute;
          right: 4px;
          bottom: 6px;
        }
      }
    }
  }
}
</style>
