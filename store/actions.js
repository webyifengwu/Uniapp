const actions ={
  // 添加商品到购物车
  addToCart({commit,state},goods){
    let cart = state.cart.slice()//复制一份
    // // 查看是否是新添
    let findResult = cart.findIndex((x)=>x.goods_id === goods.goods_id)
    if(findResult === -1){
      cart.unshift(goods)
    }else{//不是新添
      cart[findResult].goods_counts +=1 
    }
      commit("setCart",cart)
      commit("saveData",{
        dataName:"cart",
        data:cart
      })
  },
  // 设置状态
  setStatus({commit,state},goods_id){
    let cart = state.cart.slice()
    let findResult = cart.findIndex((x)=>x.goods_id === goods_id)
    cart[findResult].goods_status =  !cart[findResult].goods_status 
    commit("setCart",cart)
    commit("saveData",{
      dataName:"cart",
      data:cart
    })
  },
  // 设置商品 数量
  setCounts({commit,state},{num,goods_id}){
    let cart = state.cart.slice()
    let findResult = cart.findIndex((x)=>x.goods_id === goods_id)
    cart[findResult].goods_counts =  num 
  commit("setCart",cart)
  commit("saveData",{
    dataName:"cart",
    data:cart
  })
  },
  // 删除购物项
  deleteCart({commit,state},goods_id){
    let cart = state.cart.slice()
      let findResult = cart.findIndex((x)=>x.goods_id === goods_id)
      cart.splice(findResult,1)
    commit("setCart",cart)
    commit("saveData",{
      dataName:"cart",
      data:cart
    })
  },
  // 全选和全不选
  setAllStatus({commit,state}){
    let cart = state.cart.slice()
    let allTrue = cart.every(item=>item.goods_status)
    //有一假 则置为全真
    if(!allTrue){
      cart.forEach(item=>{
        item.goods_status = true 
      })
    }else{
      cart.forEach(item=>{
        item.goods_status = false 
      })
    }
    
   commit("setCart",cart)
   commit("saveData",{
     dataName:"cart",
     data:cart
   }) 
    
  },
  // 设置用户信息
  addUserMsg({commit},userMsg){
    commit("setUserMsg",userMsg)
    commit("saveData",{
      dataName:"userMsg",
      data:userMsg
    })
  }
  
  
}
export default actions