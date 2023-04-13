<template>
  <view class="userInfo_container">

    <!-- 头像昵称 -->
    <view class="top_box">
      <image :src="userInfo.avatarUrl" class="avatar"></image>
      <view class="nickname">
        {{userInfo.nickName}}
      </view>
    </view>
    <!-- 面板 -->
    <view class="panel_list">
      <!-- 一 -->
      <view class="panel">
        <view class="panel_body">
          <view class="panel_item">
            <text>9</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel_item">
            <text>8</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel_item">
            <text>7</text>
            <text>关注的商品</text>
          </view>
          <view class="panel_item">
            <text>6</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 二 -->
      <view class="panel">
        <view class="panel_title">
          我的订单
        </view>
        <view class="panel_body">

          <view class="panel_item">
            <image src="/static/my-icons/icon1.png" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel_item">
            <image src="/static/my-icons/icon2.png" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel_item">
            <image src="/static/my-icons/icon3.png" class="icon"></image>
            <text>退货/退款</text>
          </view>
          <view class="panel_item">
            <image src="/static/my-icons/icon4.png" class="icon"></image>
            <text>全部订单</text>
          </view>


        </view>
      </view>

      <!-- 三 -->

      <view class="panel">

        <view class="panel_list_item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel_list_item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel_list_item" @tap="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>

      </view>


    </view>


  </view>
</template>

<script setup>
  import {
    useStore
  } from "vuex"
  import {
    computed
  } from "vue";
  const store = useStore()
  const userInfo = computed(() => store.state.userInfo)
  let logout = async () => {
    const res = await uni.showModal({
      title: "提示",
      content: "确定推出登录吗？"
    })
    if (res.confirm) { //确定退出
      store.dispatch("addUserMsg", {})
      store.commit("setUserInfo", {})
      store.commit("setLoginMsg", {})
    }
  }
</script>

<style lang="scss">
  .userInfo_container {
    height: 100%;
    background-color: #f4f4f4;

    .top_box {
      height: 400rpx;
      background-color: #90EDF9;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .avatar {
        display: flex;
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid white;
        box-shadow: 0 1px 5px black;
      }

      .nickname {
        color: white;
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
      }

    }

    .panel_list {
      padding: 0 10px;
      position: relative;
      top: -15px;

      .panel {
        background-color: #ffffff;
        border-radius: 3px;
        margin-bottom: 9px;

        .panel_list_item {
          height: 45px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          padding: 0 10px;
        }

        .panel_title {
          line-height: 45px;
          padding-left: 10px;
          font-size: 15px;
          border-bottom: 1px solid #f4f4f4;
        }

        .panel_body {
          display: flex;
          justify-content: space-around;

          .panel_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            font-size: 13px;
            padding: 10px 0;

            .icon {
              width: 35px;
              height: 35px;
            }

          }
        }

      }
    }

  }
</style>