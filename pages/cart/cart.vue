<template>


  <view class="cart" v-if="cartList.length !== 0">
    <view class="top">
      <Address></Address>
      <!-- 标题区 -->
      <view class="title">
        <uni-icons :type="'shop'" :size="20"></uni-icons>
        <text class="cart-title-text">购物车</text>
      </view>
    </view>
    <!-- 展示区 -->

    <uni-swipe-action class="cart_list">
      <block v-for="(item,i) in cartList" :key="i+'item'">
        <uni-swipe-action-item :right-options="swiperArr" @click="changeCart(item.goods_id)" :goods_id="item.goods_id">

          <view class="item">
            <!-- 图片 -->
            <view class="pic" @tap="changeStatus(item.goods_id)">
              <radio :checked="item.goods_status" style="border-radius: 80%;" color="#c00000"></radio>
              <image :src="item.goods_img"></image>
            </view>
            <!-- 内容 -->
            <view class="content">
              <!-- 商品名 -->
              <view class="goods_name">
                {{item.goods_name}}
              </view>
              <!-- 商品单价 -->
              <view class="goods_price">
                ￥{{Number(item.goods_price).toFixed(2)}}
              </view>
              <!-- 商品数量 -->
              <view class="goods_counts">
                <uni-number-box :goods_id="item.goods_id" @change="changeCounts" :value="item.goods_counts" :min="1"
                  :max="99"></uni-number-box>
              </view>
            </view>
          </view>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>

    <CartSettle></CartSettle>
  </view>
  <view class="empty_cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty_img"></image>
    <text class="empty_text">购物车为空，快去选购商品吧~</text>
  </view>
</template>

<script setup>
  import {
    onLoad,
    onShow
  } from "@dcloudio/uni-app";

  import setCart from "../../hooks/setCart.js"
  import Address from "../../components/Address/Address.vue"
  import CartSettle from "../../components/CartSettle/CartSettle.vue"
  import {
    useStore
  } from "vuex"
  import {
    ref,
    computed
  } from "vue"
  let {
    setBadge
  } = setCart()
  let store = useStore()
  let cartList = computed(() => store.state.cart)
  // 改变商品选中状态
  const changeStatus = (goods_id) => {
    store.dispatch("setStatus", goods_id)
  }
  // 改变商品数量
  const changeCounts = (num, goods_id) => {
    let goodsObj = {
      num,
      goods_id
    }
    store.dispatch("setCounts", goodsObj)
  }
  // 滑动选项数组
  const swiperArr = ref([{
    text: "删除",
    style: {
      backgroundColor: "#87170F"
    }
  }])
  // 滑动选项事件
  const changeCart = (goods_id) => {
    store.dispatch('deleteCart', goods_id)
  }
  onLoad(() => {
    setBadge()
  })
  onShow(() => {
    setBadge()
  })
</script>

<style lang="scss">
  .cart {

    .top {
      position: sticky;
      top: 0;
      z-index: 999;
      background-color: #FFFFFF;

      .title {

        font-size: 20px;
        border-bottom: 1px solid grey;
        word-spacing: 5px;
      }

    }

    .cart_list {
      display: block;
      padding-bottom: 150px;

      .uni-swipe {
        border-bottom: 5px solid brown;

        .item {
          display: flex;

          // 图片
          .pic {
            position: relative;
            margin-right: 10px;

            image {
              width: 120px;
              height: 120px;
            }

            radio {
              position: absolute;
              top: 45%;
              left: 0;
            }
          }

          // 内容
          .content {
            position: relative;
            display: flex;
            flex-direction: column;

            .goods_name {
              width: 265px;
              text-indent: 25px;
              font-size: 15px;
            }

            .goods_price {
              font-size: 20px;
              color: red;

            }

            .goods_counts {
              position: absolute;
              bottom: 10rpx;
              right: 80rpx;
              display: flex;
              border: 1px solid gray;

              .num {
                width: 50px;
                text-align: center;
                line-height: 45px;
              }
            }
          }

        }

        // 
      }
    }
  }

  .empty_cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty_img {
      width: 90px;
      height: 90px;
    }

    .empty_text {
      font-size: 12px;
      color: grey;
      margin-top: 15px;
    }

  }
</style>