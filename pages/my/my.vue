<template>
  <view class="my_container">
    <!-- 未登录 -->
    <Login v-if="!loginMsg.user_id"></Login>
    <!-- 已登录 -->
    <UserInfo v-else></UserInfo>
  </view>
</template>

<script setup>
  import {
    onLoad,
    onShow
  } from "@dcloudio/uni-app";
  import {
    computed
  } from "vue"
  import {
    useStore
  } from "vuex"
  import setCart from "../../hooks/setCart.js"
  import Login from "../../components/Login/Login.vue"
  import UserInfo from "../../components/UserInfo/UserInfo.vue"
  let {
    setBadge
  } = setCart()
  const store = useStore()
  let loginMsg = computed(() => store.state.loginMsg)
  onShow(() => {
    setBadge()
  })
  onLoad(() => {
    setBadge()
  })
</script>

<style lang="scss">
  page,
  .my_container {
    height: 100%;
    
  }
</style>