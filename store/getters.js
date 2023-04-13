const getter = {
  // 商品数目
  total(state) {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.goods_counts
    })
    return sum;
  },
  // 是否全选状态
  allCheacked(state) {
    return state.cart.every(x => x.goods_status)
  },
  // 被勾选商品的总数量
  checkedCounts(state) {
    return state.cart.filter(x => x.goods_status).reduce((total, item) => total += item.goods_counts, 0)
  },
  // 被勾选商品的总价格
  checkedPrice(state) {
    return state.cart.filter(x => x.goods_status).reduce((total, item) => total += item.goods_counts * item
      .goods_price, 0)
  }
 
}
export default getter