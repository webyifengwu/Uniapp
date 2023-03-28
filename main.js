import App from './App'
// 按需导入 $http 对象
import {
  $http
} from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
//配置请求根路径
$http.baseUrl = 'https://www.uinav.com/'
// 请求拦截器
// 展示 loading 效果
$http.beforeRequest = function (options) {
  wx.showLoading({
    title: '数据加载中...',
  })
}
// 响应拦截器
// 隐藏 loading 效果
$http.afterRequest = function () {
  wx.hideLoading()
}

uni.$showMsg = function(title="数据请求失败",duration=1500,icon="none"){
  uni.showToast({
    title,
    duration,
    icon
  })
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) {}

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif