import {
  useStore
} from "vuex"
import {
  computed,
  watch
} from "vue"

function setCart() {
  const store = useStore()
  const total = computed(() => store.getters.total)
  // 监听变化
  watch(total, (newValue) => {
    setBadge()
  })
  // 初始化
  const setBadge = () => {
    uni.setTabBarBadge({
      index: 2,
      text: total.value + ""
    })
  }
  return {
    setBadge
  }
}
export default setCart