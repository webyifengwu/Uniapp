<template>
  <view class="search-box">
    <uni-search-bar :bgColor="'#ffffff'" @confirm="ok" @input="input" v-model="kw" />
  </view>
  <!-- 展示列表 -->
  <view class="display-list" v-if="searchResult.length !== 0">
    <view class="list-item" v-for="(item,i) in searchResult" :key="i+'item'" @click="navigateTo(item)">
      <text class="goods_name">{{item.goods_name}}</text>
      <uni-icons :type="'forward'" :resize="17" :color="'green'"></uni-icons>
    </view>
  </view>
  <!-- 历史列表 -->
  <view class="history-box" v-else>
    <view class="history-title">
      <text> 搜索历史 </text>
      <uni-icons :type="'trash'" :resize="17" @tap='deleteHistory'></uni-icons>
    </view>
    <view class="history-list">
      <uni-tag @tap="navigateToList(item2)" v-for="(item2,i2) in historys" :key="i2+'item2'" :text="item2"
        :type="'success'" inverted="true" :customStyle="`margin: 5px 15px 5px 5px;display: inline-block;`"></uni-tag>
    </view>
  </view>
</template>
<script setup>
  import {
    onLoad,
    onShow,
    onReachBottom,
    onPullDownRefresh
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
  // 防抖计时器
  let timer = ref(null)
  let kw = ref('')
  let searchResult = ref([])
  let historyList = ref([])
  let historys = computed(() => [...historyList.value].reverse())
  // 方法
  let ok = () => {
      console.log("确定");
    }
    let input = (res) => {
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {
        kw.value = res
        getSearchResult(res)
      }, 500)
    }
  // 跳转到商品详情
  let navigateTo = (item) => {
    uni.navigateTo({
      url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
    })
  }
  //跳转到商品列表
  let navigateToList = (item2) => {
    uni.navigateTo({
      url: "/subpkg/goods_list/goods_list?query=" + item2
    })
  }
  //清空历史记录
  let deleteHistory = () => {
    historyList.value = []
    uni.setStorageSync("kw", JSON.stringify([]))
    console.log("清空");
  }
  // 添加历史记录
  let addHistory = (str) => {
    let set = new Set(historyList.value)
    set.delete(str)
    set.add(str)
    historyList.value = Array.from(set)
    //本地存储
    uni.setStorageSync("kw", JSON.stringify(historyList.value))
  }
  // 获取数据
  let getSearchResult = async () => {
    if (kw.value === "") {
      searchResult.value = []
      return
    }
    const {
      data
    } = await uni.$http.get(`api/public/v1/goods/qsearch`, {
      query: kw.value
    })
    if (data.meta.status !== 200) {
      searchResult.value = []
      return uni.$showMsg()
    } else {
      addHistory(kw.value)
      searchResult.value = data.message
    }
  }
  onLoad(() => {
    historyList.value = JSON.parse(uni.getStorageSync("kw") || '[]')
  })
</script>


<style lang="scss">
  // 搜索列表
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
    overflow: hidden;
    background-color: #90edf9;
  }

  // 展示列表
  .display-list {
    .list-item {
      font-size: 18px;
      padding: 13px 0;
      border-bottom: 1px #efef0f solid;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods_name {
        white-space: nowrap;
        // overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  // 历史搜索列表
  .history-box {
    padding: 0 15px 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid grey;
    }

    .history-list {
      margin-top: 5px;
    }

  }
</style>