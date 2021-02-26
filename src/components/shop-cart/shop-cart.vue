<template>
  <div class="shop-cart">
    <div class="content" @click="showList">
      <div class="left">
        <div class="circle">
          <div class="icon-wrapper" :class="{ hascount: totalPrice }">
            <i class="icon-shopping_cart" :class="{ hascount: totalPrice }"></i>
            <bubble
              v-if="totalCount"
              class="bubble"
              :count="totalCount"
            ></bubble>
          </div>
        </div>
        <div class="left-content">
          <span class="total-price" :class="{ hascount: totalPrice }"
            >￥{{ totalPrice }}</span
          >
          <span class="line"></span>
          <span class="delivery-price">另需配送费{{ deliveryPrice }}元</span>
        </div>
      </div>
      <div class="right" :class="{ enough: isEnough }" @click="pay">
        <span v-if="!isEnough">￥{{ minPrice }}起送</span>
        <span v-else>去结算</span>
      </div>
    </div>
    <div class="cart-list-wrapper" v-show="listShow">
      <div class="cart-list">
        <div class="list-header">
          <span class="title">购物车</span>
          <span class="clear" @click="clearCart">清空</span>
        </div>
        <div class="list-body-wrapper" ref="listBodyWrapper" @click.stop>
          <ul class="list-body">
            <li
              v-for="(item, index) in selectedFoods"
              :key="index"
              class="list-item"
            >
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-total-price"
                  >￥{{ item.count * item.price }}</span
                >
              </div>
              <div class="cart-control-wrapper">
                <cart-control :food="item"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="listShow" @click="showList"></div>
    <div class="balls-wrapper" v-for="(ball, index) in balls" :key="index">
      <transition
        name="drop"
        @before-enter="beforeDrop"
        @enter="enterDrop"
        @afterEnter="afterDrop"
      >
        <div class="ball-outer" v-show="ball.show" ref="balls">
          <div class="ball-inner"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Bubble from "components/subcomponents/bubble/bubble";
import CartControl from "components/subcomponents/cart-control/cart-control";
import BetterScroll from "better-scroll";
export default {
  name: "shop-cart",
  props: {
    selectedFoods: {
      type: Array
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  },
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [],
      listShow: false
    };
  },
  methods: {
    drop(el) {
      const len = this.balls.length;
      for (let i = 0; i < len; i++) {
        if (!this.balls[i].show) {
          this.balls[i].show = true;
          // this.balls[i].el = el;
          this.dropBalls.push(this.balls[i]);
          this.$refs.balls[i].el = el;
          return;
        }
      }
    },
    beforeDrop(ball) {
      const rect = ball.el.getBoundingClientRect();
      const x = rect.left - 32;
      const y = -(window.innerHeight - rect.top - 38);
      const innerBall = ball.getElementsByClassName("ball-inner")[0];
      ball.style.display = ""; //这一步其实vue会做
      ball.style.transform = `translateY(${y}px)`;
      innerBall.style.transform = `translateX(${x}px)`;
    },
    enterDrop(ball, done) {
      let rf = ball.offsetHeight; // 这里不明白呢--触发浏览器重绘。因为浏览器不会根据js对style的修改实时更新，而是当js修改完成后，会对所有的修改统一更新。所以如果不加这一句，统一更新时，元素display为none，none的元素就无法使用过渡，而且也不会应用上面的translate，会被下面的代替。
      const innerBall = ball.getElementsByClassName("ball-inner")[0];
      ball.style.transform = "translateY(0)";
      innerBall.style.transform = "translateX(0)";
      ball.addEventListener("transitionend", done); // 不执行done的话，不会执行afterEnter
    },
    afterDrop(ball) {
      ball.style.display = "none";
      const dropBall = this.dropBalls.shift();
      dropBall.show = false;
    },
    showList() {
      if(!this.totalCount){
        return
      }
      this.listShow = !this.listShow;
      if(this.cartListScroll){ // 修复bug，当第一次显示时没达到滚动高度，第二线达到滚动高度，但却不能滚动
        this.$nextTick(() => {
          this.cartListScroll.refresh();
        })
      }else{
        this.$nextTick(() => {
          this.initCartListScroll();
        });
      } 
    },
    initCartListScroll() {
      this.cartListScroll = this.cartListScroll || new BetterScroll(this.$refs.listBodyWrapper, {
        scrollY: true,
        click: true
      });
    },
    clearCart(){
      if(window.confirm('确定清空购物车？')){
        this.selectedFoods.forEach(food => {
          food.count = 0;
        })
      } 
    },
    pay(event){
      if(this.isEnough){
        event.stopPropagation();
        if(window.confirm(`您需支付￥${this.totalPrice + this.deliveryPrice}元`)){
          this.selectedFoods.forEach(food => {
            food.count = 0;
          })
          return;
        }
      }
      return;
    }
  },
  computed: {
    totalPrice() {
      let num = 0;
      this.selectedFoods.forEach(food => {
        if (food.count) {
          num += food.count * food.price;
        }
      });
      return num;
    },
    totalCount() {
      let num = 0;
      this.selectedFoods.forEach(food => {
        if (food.count) {
          num += food.count;
        }
      });
      return num;
    },
    isEnough() {
      return this.totalPrice >= this.minPrice ? true : false;
    }
  },
  watch: { // 数量为零时，关闭cartList
    totalCount(newVal){
      if(!newVal){
        this.listShow = false;
      }
    }
  },
  components: {
    Bubble,
    CartControl
  }
};
</script>

<style lang="scss">
@import "../../assets/css/mixins.scss";
.shop-cart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  .content {
    display: flex;
    width: 100%;
    height: 48px;
    background: #141d27;
    .left {
      flex: 1;
      padding: 0 12px 12px 12px;
      display: flex;
      .circle {
        background: #141d27;
        position: relative;
        z-index: 10;
        top: -10px;
        width: 56px;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        .icon-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          &.hascount {
            background: #00a0dc;
          }
          .icon-shopping_cart {
            font-size: 24px;
            line-height: 24px;
            color: rgba(255, 255, 255, 0.4);
            &.hascount {
              color: #fff;
            }
          }
          .bubble {
            position: absolute;
            top: -5px;
            left: 30px;
          }
        }
      }
      .left-content {
        display: flex;
        align-items: center;
        padding: 12px 0 0 12px;
        font-size: 14px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
        .total-price {
          font-weight: 700;
          &.hascount {
            color: #fff;
          }
        }
        .line {
          display: inline-block;
          margin: 0 12px;
          height: 24px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
      }
    }
    .right {
      padding: 12px 8px 0 8px;
      width: 105px;
      background: rgba(255, 255, 255, 0.2);
      font-size: 14px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.4);
      font-weight: 700;
      text-align: center;
      &.enough {
        background: #00b43c;
        color: #fff;
      }
    }
  }

  .cart-list-wrapper {
    position: fixed;
    z-index: 9;
    left: 0;
    bottom: 48px;
    width: 100%;
    .cart-list {
      width: 100%;
      max-height: 282px;
      overflow: hidden;
      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 18px;
        height: 40px;
        background: #f3f5f7;
        @include border-bottom-1px(rgba(7, 17, 27, 0.1));
        .title {
          font-size: 14px;
          line-height: 40px;
          color: rgb(1, 17, 27);
        }
        .clear {
          font-size: 12px;
          line-height: 40px;
          color: rgb(0, 160, 220);
        }
      }
      .list-body-wrapper {
        max-height: 242px;
        overflow: hidden;
        background: #fff;
        .list-body {
          padding: 0 18px;
          .list-item {
            display: flex;
            align-items: center;
            height: 48px;
            @include border-bottom-1px(rgba(7, 17, 27, 0.1));
            .item-info {
              flex: 1;
              display: flex;
              justify-content: space-between;
              margin-right: 12px;
              .item-name {
                font-size: 14px;
                line-height: 48px;
                color: rgb(7, 17, 27);
              }
              .item-total-price {
                font-size: 10px;
                line-height: 48px;
                font-weight: 700;
                color: rgb(240, 20, 20);
              }
            }
          }
        }
      }
    }
  }
  .list-mask{
    position: fixed;
    bottom: 48px;
    left: 0;
    z-index: 5;
    height: 100%;
    width: 100%;
    background: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);
  }
  .balls-wrapper {
    .ball-outer {
      position: fixed;
      left: 30px;
      bottom: 22px;
      width: 16px;
      height: 16px;
      transition: all 0.4s cubic-bezier(0.33, -0.69, 1, 0.77);
      .ball-inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }
}
</style>
