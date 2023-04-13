<template>
  <view class="login_container">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="btn_login" open-type="getUserInfo" @getuserinfo="getUserInfo">点我登录</button>
    <view class="tips_text">
      登陆后享受更多权益
    </view>
  </view>
</template>

<script setup>
  import {
    useStore
  } from "vuex"
  const store = useStore()
  // 登录按钮
  const getUserInfo = (e) => {
    // console.log(e);
    if (e.detail.errMsg !== 'getUserInfo:ok') return uni.$showMsg("您取消了授权")
    e.detail.userInfo.avatarUrl = "https://www.qqkw.com/d/file/p/2022/04-23/a4c0f10b053a130a97c6a9a4d7a2e4a0.jpg"
    e.detail.userInfo.nickName = "珊"
    store.commit('setUserInfo', e.detail.userInfo)

    getToken(e.detail)
  }
  const getToken = async (info) => {
    let code = ""
    let res = await uni.login({
      provider: 'wxpay'
    })
    if (res.errMsg === "login:ok") {

      let query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature
      }

      let {
        data
      } = await uni.$http.post('api/public/v1/users/wxlogin', query)

      // if (data.meta.status !== 200) {
      // return uni.$showMsg("请求登录失败")
      // } else {
      // store.commit("setLoginMsg", data.message)
      // }
      store.commit("setLoginMsg", {
        user_id: 27,
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o"
      })
      console.log(store.state.redirect);
      if (store.state.redirect.from && store.state.redirect.openType === 'switchTab') {
        uni.switchTab({
          url: store.state.redirect.from,
          complete() {
            store.commit('setRedirect', {})
          }
        })
      }
    } else {
      return uni.$showMsg("授权失败!")
    }


  }

  // {"user_id":6,"token":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o"}
</script>

<style lang="scss">
  .login_container {
    height: 785rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      border-radius: 100%;
      transform: translateY(50%);
      background-color: white;
    }

    .btn_login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #90EDF9;
    }

    .tips_text {
      font-size: 12px;
      color: grey;
    }

  }
</style>