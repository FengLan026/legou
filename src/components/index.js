import HeaderBackBar from "./HeaderBackBar.vue"
import FooterNavBar from "./FooterNavBar.vue"
import GoodsCard from "./GoodsCard.vue"
export default {
  install(Vue) {
    Vue.component('HeaderBackBar', HeaderBackBar)
    Vue.component('FooterNavBar', FooterNavBar)
    Vue.component('GoodsCard', GoodsCard)
  }
}
