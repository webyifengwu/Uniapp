<template>
  <view class="search-container" :style="{backgroundColor:bgColor}">
    <view class="search-box" :style="[{borderRadius:radious+'px'}]">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  bgColor:{
    type:String,
    default:"#90edf9"
  },
  radious:{
    type:Number,
    default:0
  }
})

</script>

<style lang="scss">
.search-container{
  // position: sticky;
  // top: 0;
  // z-index: 999;
  // background-color: #90edf9;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  .search-box{
    height: 36px;
    background-color: #ffffff;
      // border-radius: 15px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    .placeholder{
      font-size: 15px;
      margin-right: 5px;
    }
  }
}
</style>