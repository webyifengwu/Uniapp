<template>
  <Search @tap="navigateToSearch" :bgColor="'#90edf9'" :radious="15"></Search>
  <view class="scrollContainer">
    <scroll-view scroll-y="true" class="scroll_left" :style="{height:`${wh}px`}">
      <block v-for="(item,i) in categories" :key="i+'item'">
        <view @tap="changeActive(i,item)" :class="['scroll_left_item',i === active ? 'active' : '']">{{item.cat_name}}
        </view>
      </block>
    </scroll-view>

    <scroll-view scroll-y="true" class="scroll_right" :style="{height:`${wh}px`}" scroll-with-animation="true"
      :scroll-top="scrollTop" @scroll="scroll">
      <block v-for="(item2,i2) in categories2" :key="i2+'item2'">
        <view class="scroll_right_item">
          <view class="title" v-show="item2.children">
            /{{item2.cat_name}}/
          </view>
          <view class="content">
            <view class="kind" v-for="(item3,i3) in item2.children" :key="i3+'item3'" @tap="navigateTo(item3)">
              <!-- <image :src="item3.cat_icon" mode="widthFix"></image> -->
              <view class="pic">
                <image
                  src="https://ts3.cn.mm.bing.net/th?id=OIP-C.pN36oX4awO1ESrVls8ygtgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                  mode="widthFix"></image>
              </view>
              <view class="text">
                {{item3.cat_name}}
              </view>
            </view>
          </view>
        </view>
      </block>
    </scroll-view>

  </view>
</template>

<script setup>
  import setCart from "../../hooks/setCart.js"
  import {
    onShow,
    onLoad
  } from "@dcloudio/uni-app";
  import {
    ref,nextTick 
  } from "vue"
  let {
    setBadge
  } = setCart()
  let wh = ref("")
  // 分类数据
  let categories = ref([])
  // 二级分类
  let categories2 = ref([])
  // 默认初始为0
  let active = ref(0)
  // 二级分类距离顶部的距离
  let scrollTop = ref(0)
  let old = ref({
    scrollTop: 0
  })

  let scroll = (e) => {
    old.value.scrollTop = e.detail.scrollTop
  }
  let getDate = async (str) => {
    let {
      data
    } = await uni.$http.get(`api/public/v1/${str}`)
    if (data.meta.status !== 200) {
      uni.$showMsg()
    } else {
      categories.value = data.message
      categories2.value = data.message[0].children
    }
  }

  let changeActive = async (index, item) => {
    categories2.value = item.children
    scrollTop.value = old.value.scrollTop
   await nextTick(()=> {
      scrollTop.value = 0
    });
    active.value = index
  }

  let navigateTo = (item3) => {
    uni.navigateTo({
      url: "/subpkg/goods_list/goods_list?query=" + item3.cat_name
    })
  }
  let navigateToSearch = () => {
    uni.navigateTo({
      url: "/subpkg/search/search"
    })
  }

  onLoad(async () => {
    setBadge()
    let sysInfo = await uni.getSystemInfo()
    wh = sysInfo.windowHeight - 50
    getDate("categories")
  })
  
  onShow(()=>{
    setBadge()
  })
</script>

<style lang="scss">
  .scrollContainer {
    display: flex;

    .scroll_left {
      width: 30%;
      border-right: 1px solid grey;
      background-color: lightgray;

      .scroll_left_item {
        line-height: 50px;

        &.active {
          border-left: 5px solid palevioletred;
          background-color: aliceblue;
        }
      }
    }

    .scroll_right {
      .scroll_right_item {
        margin-bottom: 30px;

        .title {
          text-align: center;
        }

        .content {
          display: flex;
          flex-wrap: wrap;

          .kind {

            width: 33.3%;
            height: 33.3%;

            .pic {
              text-align: center;

              image {
                width: 60px;
                height: 60px;
              }
            }

            .text {

              text-align: center;
            }
          }
        }

        // border: 1px solid green;
      }
    }
  }
</style>