import state from "./state"

const mutations = {
  // 添加到购物车
  setCart(state, cart) {
    state.cart = cart

  },
  setUserMsg(state, userMsg) {
    state.userMsg = userMsg
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
    uni.setStorageSync("userInfo", JSON.stringify(userInfo))
  },
  setLoginMsg(state, loginMsg) {
    state.loginMsg = loginMsg
    uni.setStorageSync("loginMsg", JSON.stringify(loginMsg))
  },
  // 永久化保存数据
  saveData({}, dataObj) {
    uni.setStorageSync(dataObj.dataName, JSON.stringify(dataObj.data))
  },
  // 设置重定向
  setRedirect(state, info) {
    state.redirect = info
  }

}
export default mutations