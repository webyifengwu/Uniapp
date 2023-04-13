<template>
  <view class="cart_settle_container">

    <label class="radio" @tap="changeAllStatus">
      <radio color="#c00000" :checked="allCheacked" /><text>全选</text>
    </label>
    <!-- 计算金额 -->
    <view class="amount_box">
      合计：<text class="amount">￥{{Number(checkedPrice).toFixed(2)}}</text>
    </view>
    <!-- 结算 -->
    <view class="btn_settle" @tap="account">
      结算（{{checkedCount}}）
    </view>
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
  const checkedCount = computed(() => store.getters.checkedCounts)
  const checkedPrice = computed(() => store.getters.checkedPrice)
  const allCheacked = computed(() => store.getters.allCheacked)
  // 全选按钮
  const changeAllStatus = () => {
    store.dispatch("setAllStatus")
  }
  let seconds = ref(3)
  let timer = ref(null)
  // 结算按钮
  const account = () => {
    let token = false;
    if (!checkedCount.value) return uni.$showMsg("请选择要结算的商品！")
    if (!store.state.userMsg.userName) return uni.$showMsg("请输入收货信息!")
    // if(!store.state.loginMsg.token)return uni.$showMsg("请先登录！")
    if (!store.state.loginMsg.token) return delayNavigate()
    // 支付
    payOrder()
  }
  // 延迟跳转到
  const delayNavigate = () => {
    showTips(seconds.value)
    timer.value = setInterval(() => {
      seconds.value--
      if (seconds.value <= 0) {
        clearInterval(timer.value)
        seconds.value = 3

        uni.switchTab({
          url: "/pages/my/my",
          success() {
            store.commit('setRedirect', {
              openType: 'switchTab',
              from: "/pages/cart/cart"
            })
          }
        })
        return
      }
      showTips(seconds.value)
    }, 1000)
  }
  // 显示计时
  const showTips = (num) => {
    uni.showToast({
      icon: "none",
      title: "请登录后在结算！" + num + '秒后自动跳转到登录页面',
      mask: true,
      duration: 1500
    })
  }
  let payOrder = async () => {
    // 创建订单
    const orderInfo = {
      order_price: 0,
      consignee_addr: store.state.userMsg.userAddress,
      // order_detail:,
      goods: store.state.cart.filter(x => x.goods_status).map(x => {
        return {
          goods_id: x.goods_id,
          goods_counts: x.goods_counts,
          goods_price: x.goods_price
        }
      })
    }
    const {
      data
    } = await uni.$http.post('api/public/v1/my/orders/create', orderInfo)
    if (data.meta.status !== 200) return uni.$showMsg("订单创建失败！")
    const orderNumber = res.message.order_number
    // const orderNumber = "GD20180507000000000110"
    prePayfor(orderNumber)

  }
  const prePayfor = async (order_number) => {
    // 订单预支付
    const {
      data
    } = await uni.$http.post("api/public/v1/my/orders/req_unifiedorder", {
      order_number: order_number
    })
    if (data.meta.status !== 200) return uni.$showError("预付订单生成失败！")
    const payInfo = data.message.pay
    wxPay(payInfo, order_number)
  }
  //微信支付
  const wxPay = async (pay, order_number) => {
    const res = await uni.requestPayment({
      provider: 'weixin',
      orderInfo: pay
    });
    // 这里查看返回结果进行判断
    if (!false) return uni.$showMsg("订单未支付！")
    const {
      data
    } = await uni.$http.post("api/public/v1/my/orders/chkOrder", {
      order_number:order_number
    })
    if(data.meta.status !== 200)return uni.$showError('订单未支付！')
    uni.showToast({
      title:'支付完成！',
      icon:"success"
      
    })
  }
</script>

<style lang="scss">
  .cart_settle_container {

    position: fixed;
    bottom: 1rpx;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount {
      color: #c00000;
    }

    .btn_settle {
      
      border: 1px solid black;
      min-width: 100px;
      background-color: #90EDF9;
      text-align: center;
      line-height: 50px;
    }

  }
</style>