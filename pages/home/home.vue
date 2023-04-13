<template>
  <view class="container">
    <view class="searchBox">
      <Search @tap="navigateToSearch" :bgColor="'#90edf9'" :radious="15" class="search"></Search>
    </view>

    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swiperdata" :key="item.goods_id">
        <navigator :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`" style="text-align: center;"
          class="swiper-item">
          <image :src="item.image_src" mode="widthFix"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类项 -->
    <view class="carts">
      <view v-for="(item,i) in catitems" :key="item.name" @click="naviClickHandler(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>
    <!-- 楼层项 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floordata" :key="i">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <view class="floor-img-box">
          <!-- 左侧盒子 -->
          <view class="floor-img-left">
            <navigator :url="item.product_list[0].navigator_url">
              <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx;'}"
                mode="widthFix"></image>
            </navigator>
          </view>
          <!-- 右侧盒子 -->
          <view class="floor-img-right">
            <navigator :url="item2.navigator_url" v-for="(item2,index) in item.product_list" :key="index"
              v-show="index">
              <image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"
                :class="{item:index%2!==0}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>


<script setup>
  import setCart from "../../hooks/setCart.js"
  import {
    onLoad,
    onShow
  } from "@dcloudio/uni-app";
  import {
    ref
  } from "vue"
  let {
    setBadge
  } = setCart()
  let strArr = ["swiperdata", "catitems", "floordata"]
  //轮播图
  let swiperdata = ref([])
  //分类项
  let catitems = ref([])
  //楼层项
  let floordata = ref([])
  // 获取数据
  let getData = async (str) => {
    const {
      data
    } = await uni.$http.get(`api/public/v1/home/${str}`)
    // console.log(data);
    if (data.meta.status !== 200) {
      return uni.$showMsg()
    } else {
      if (str == "floordata") {
        data.message.forEach(floor => {
          floor.product_list.forEach((item => {
            item.navigator_url = "/subpkg/goods_list" + item.navigator_url.split("/pages")[1]
          }))
        })
      }
      if (str === "swiperdata") {
        swiperdata.value = data.message
      } else if (str === "catitems") {
        catitems.value = data.message
      } else {
        floordata.value = data.message
      }

    }
  }

  let naviClickHandler = (item) => {
    if (item.name == "分类") {
      uni.switchTab({
        url: "/pages/cate/cate"
      })
    }
  }

  let navigateToSearch = () => {
    uni.navigateTo({
      url: "/subpkg/search/search"
    })
  }

  onLoad(() => {
    setBadge()
    strArr.map(item => {
      getData(item)
    })
  })
  onShow(()=>{
    setBadge()
  })
</script>

<style lang="scss">
  .container {

    // 搜索层
    .searchBox {
      position: sticky;
      top: 0;
      z-index: 999;
    }

    // 楼层项
    swiper {
      height: 330rpx;

      .swiper-item {

        width: 100%;
        height: 100%;
      }
    }

    // 分类项
    .carts {
      display: flex;
      margin: 15px 0;
      justify-content: space-around;

      image {
        width: 128rpx;
        height: 140rpx;
      }
    }

    // 楼层项
    .floor-list {
      .floor-item {
        .floor-title {
          height: 60rpx;
          display: flex;
        }

        .floor-img-box {
          display: flex;
          justify-content: space-between;

          .floor-img-left {
            margin-right: 10rpx;
          }

          .floor-img-right {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            // .item{
            //     margin-right: 10rpx;
            // }
          }
        }
      }
    }

  }
</style>