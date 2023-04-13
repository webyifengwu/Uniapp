<template>
  <view class="address">
    <view class="address-choose-box" v-if="!userMsg.userName">
      <!-- 收获地址 -->
      <button type="primary" size="mini" class="btnChooseAddress" @tap="chooseAdress">请选择收货地址</button>
    </view>
    <!-- 收货信息 -->
    <view class="address-info-box" v-else>
      <view class="row1">
        <!-- 左侧 -->
        <view class="row1_left">
          <view class="username">
            收货人：<text>{{userMsg.userName}}</text>
          </view>
        </view>
        <!-- 右侧 -->
        <view class="row1_right">
          <view class="phone">
            电话：<text>{{userMsg.userPhone}}</text>
          </view>
        </view>
      </view>
      <view class="row2">
        <view class="row2_left">
          收货地址:
        </view>
        <view class="row2_right">
          {{userMsg.userAddress}}
        </view>
      </view>
    </view>
    <!-- 下边框 -->
    <view class="address-border"></view>
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from "vue"
  import {
    onLoad,
    onShow
  } from "@dcloudio/uni-app";
  import {
    useStore
  } from "vuex"
  const store = useStore()
  let userMsg = computed(() => store.state.userMsg)
  let chooseAdress = () => {
    uni.chooseAddress({
      success(res) {
        // console.log(userMsg);
        let userMsg = {
          userName: res.userName || "",
          userPhone: res.telNumber || "",
          userAddress: `${res.provinceName}/${res.cityName}/${res.countyName}/${res.detailInfo}` || "",
          postCode: res.postalCode || ""
        }
        store.dispatch("addUserMsg", userMsg)

      }
    })
  }
</script>
<style lang="scss">
  .address {
    .address-choose-box {
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .address-info-box {
      height: 50px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      font-size: 15px;
      .row1 {
        display: flex;
        justify-content: space-around;
        .row1_left {
          display: flex;
          align-items: center;
        }
      }
      .row2 {
        display: flex;
        text-indent: 13px;
        justify-content: space-around;
      }
    }
    .address-border {
      display: block;
      width: 100%;
      height: 5px;
      background: url("/static/cart_border@2x.png") no-repeat 0/cover;
    }
  }
</style>