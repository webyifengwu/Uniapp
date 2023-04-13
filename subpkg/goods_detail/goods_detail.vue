<template>
  <view class="goods_details">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :circular="true" :duration="1000" class="swiper">
      <swiper-item v-for="(pic,i) in goods_info.pics" :key="i+`pic`">
        <view class="swiper-item">
          <image :src="pic.pics_big" mode="" class="item-pic" @tap="preImg(i)"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods-info-box" v-if="goods_info.goods_name">
      <!-- 价格 -->
      <view class="price">
        ￥{{Number(goods_info.goods_price).toFixed(2)}}元
      </view>
      <view class="goods-info-body">
        <view class="goods-name">
          {{goods_info.goods_name}}
        </view>
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
        <view class="yf">
          快递：免运费
        </view>
      </view>
    </view>
    <!-- 商品详情 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>

  </view>
</template>
<script setup>
  import {
    onLoad,
    onShow
  } from "@dcloudio/uni-app";
  import {
    computed,
    ref,
    watch
  } from "vue"
  import {
    useStore
  } from "vuex"
  // 变量
  const store = useStore()
  let isLoading = ref(false)
  let goods_info = ref({})
  let total = computed(() => store.getters.total)
  let options = ref([{
    icon: 'shop',
    text: '店铺',
    infoBackgroundColor: '#007aff',
    infoColor: "red"
  }, {
    icon: 'cart',
    text: '购物车',
    info: total
  }])
  let buttonGroup = ref([{
      text: '加入购物车',
      backgroundColor: '#ff0000',
      color: '#fff'
    },
    {
      text: '立即购买',
      backgroundColor: '#ffa200',
      color: '#fff'
    }
  ])

  // 方法
  let getGoodsDetails = async (msg) => {

    isLoading.value = true
    const {
      data
    } = await uni.$http.get("/api/public/v1/goods/detail",
      msg
    )
    data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
      .replace(/webp/g, 'jpg')
    isLoading.value = false

    if (data.meta.status !== 200)
      return uni.$showMsg()
    else {
      goods_info.value = data.message
    }
  }

  let preImg = (i) => {
    uni.previewImage({
      current: i,
      urls: goods_info.value.pics.map(x => x.pics_big)
    })
  }

  let onClick = (e) => {
    if (e.content.text === "购物车") {
      uni.switchTab({
        url: "/pages/cart/cart"
      })
    }
  }

  let buttonClick = (e) => {
    if (e.content.text === "加入购物车") {
      let goods = {
        goods_id: goods_info.value.goods_id,
        goods_name: goods_info.value.goods_name,
        goods_price: goods_info.value.goods_price,
        goods_counts: 1,
        goods_img: goods_info.value.goods_small_logo,
        goods_status: true
      }
      store.dispatch("addToCart", goods)
    }
  }

  onLoad((option) => {
    getGoodsDetails(option);
  })
</script>

<style lang="scss">
  .goods_details {

    // 轮播图
    .swiper {
      width: 100%;
      height: 400px;

      .swiper-item {
        text-align: center;

        .item-pic {
          width: 400px;
          height: 400px;
        }
      }
    }

    // 商品内容
    .goods-info-box {
      .price {
        font-size: 18px;
        margin: 10px 0;
        color: #c00000;
      }

      .goods-info-body {
        display: flex;
        justify-content: space-between;

        .goods-name {
          font-size: 13px;
          pointer-events: 10px;
          // border-right: 3px solid brown;
        }

        .yf {
          margin: 10px 0;
          font-size: 12px;
          color: grey;
        }

        .favi {
          width: 120px;
          font-size: 12px;
          display: flex;
          align-items: center;
          border-left: 1px solid #efefef;
          color: grey;
        }
      }
    }

    // 商品导航
    .goods_nav {
      position: sticky;
      width: 100%;
      bottom: 0;
    }
  }
</style>