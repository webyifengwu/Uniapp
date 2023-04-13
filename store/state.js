const state = {
  cart: JSON.parse(uni.getStorageSync("cart") || '[]'),
  userMsg: JSON.parse(uni.getStorageSync("userMsg") || '{}'),
  userInfo: JSON.parse(uni.getStorageSync("userInfo") || '{}'),
  loginMsg: JSON.parse(uni.getStorageSync("loginMsg") || '{}'),
  redirect:{}
}
export default state
// 