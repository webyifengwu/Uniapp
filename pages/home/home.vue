<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="item.goods_id">
        <navigator :url="`/subpkg/goods_detail/goods_detail?good_id=${item.goods_id}`" class="swiper-item">
          <image :src="item.image_src" mode="aspectFill"></image>
        </navigator>
      </swiper-item>

    </swiper>

  </view>
</template>

<script>
  export default {
    onLoad() {
      this.getSwiper()
    },
    data() {
      return {
        //轮播图
        swiperList: []
      };
    },
    methods: {
      async getSwiper() {
        const {
          data
        } = await uni.$http.get('api/public/v1/home/swiperdata')
        
        if (data.meta.status !== 200) {
          return uni.$showMsg()
        } else {
          uni.$showMsg("获取数据成功！", 3000)
          this.swiperList = data.message
        }

      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item {

      width: 100%;
      height: 100%;

    }
  }
</style>