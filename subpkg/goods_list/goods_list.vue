<template>
  <view>

    <view class="goods-list" v-if="goodsList.length !== 0">
      <block v-for="(goods,i) in goodsList" :key="i+'goods'">
        <view class="goods-item" @tap="navigateToDetail(goods)">
          <!-- 左侧 -->
          <view class="goods-item-left">
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 右侧 -->
          <view class="goods-item-right">
            <view class="goods-name">
              {{goods.goods_name}}
            </view>
            <view class="goods-info-cox">
              <view class="goods-price">
                ￥ {{toFixed(goods.goods_price)}}元

              </view>
            </view>
          </view>
        </view>
      </block>
    </view>

    <!-- <uni-pagination :title="'标题文字'" :show-icon="true"   :pageSize="queryObj.pagesize" :total="total" :current="queryObj.pagenum" @change="changePage" v-if="goodsList.length !== 0"></uni-pagination> -->
    <view v-else>
      没有找到类似商品
    </view>
  </view>
</template>

<script setup>
  import {
    onLoad,
    onShow,onReachBottom,onPullDownRefresh
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
  const store = useStore();
  // 节流阀
  let isLoading = ref(false)
  let queryObj = ref({
    //查询关键词
    query: "",
    //商品分类cid
    cid: '',
    // 页码值
    pagenum: 1,
    // 每页数据条数
    pagesize: 10
  })
  let goodsList = ref([])
  let total = ref(0)
  //默认商品图片
  let defaultPic = "https://tse1-mm.cn.bing.net/th/id/OIP-C.lMjNF8j6nfAQG5Ro6qBv6AHaLE?pid=ImgDet&rs=1"
  // 方法
  // 获取数据
  let getGoodsList =async (cb) => {
    isLoading.value = true
    const {
      data
    } = await uni.$http.get("/api/public/v1/goods/search", queryObj.value)
    isLoading.value = false
    cb && cb()
    if (data.meta.status !== 200) {
      return uni.$showMsg()
    } else {
      goodsList.value = [...goodsList.value, ...data.message.goods]
      total.value = data.message.total
    }

  }
  // 小数点
  let toFixed = (num) => {
    return Number(num).toFixed(2)
  }
  // 分页器函数
  let changePage = (option) => {
    queryObj.value.pagenum = option.current
    getGoodsList()
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
  // 跳转
  let navigateToDetail = (goods) => {
    console.log(goods);
    uni.navigateTo({
      url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods.goods_id
    })
  }

  onLoad((option) => {

    queryObj.value.query = option.query || ""
    queryObj.value.cid = option.cid || ""
    getGoodsList()
  })

  // 上拉触底
  onReachBottom(() => {
    if (queryObj.value.pagenum * queryObj.value.pagesize >= total.value) return uni.$showMsg("没有更多商品！")
    if (isLoading.value) return
    queryObj.value.pagenum += 1
    getGoodsList()
  })
  // 下拉刷新
  onPullDownRefresh(() => {
    if (isLoading.value) return
    queryObj.value.pagenum = 1;
    goodsList.value = []
    getGoodsList(() => uni.stopPullDownRefresh())
  })
</script>

<style lang="scss">
  .goods-list {
    .goods-item {
      padding: 10px 15px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;

      // justify-content: space-around;
      .goods-item-left {

        // width: 350rpx;
        // height: 350rpx;
        .goods-pic {
          width: 100px;
          height: 100px;
        }

      }

      .goods-item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .goods-name {
          font-size: 13px;
        }

        .goods-info-cox {

          .goods-price {
            text-align: right;
            font-size: 16px;
            color: red;
          }
        }
      }
    }
  }
</style>