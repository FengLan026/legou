import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home"



const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    name: 'home'
  },
  {
    path: '/topic',
    name: 'topic',
    component: () => import("@/views/Topic"),
  },
  {
    path: '/category',
    name: 'category',
    component: () => import("@/views/Category"),
  },
  {
    path: '/categorylist/main',
    name: 'categorylist',
    component: () => import("@/views/Category/CategoryList"),
    meta: {
      notShowNav: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import("@/views/Cart"),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import("@/views/My"),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import("@/views/Search"),
    meta: {
      notShowNav: true
    }
  },
  {
    // 供应商详情
    path: '/pages/branddetail/main',
    name: 'brandDetail',
    component: () => import('@/views/Pages/BrandDetail'),
    meta: {
      notShowNav: true
    }
  },
  {
    // 主题详情
    path: '/pages/topicdetail/main',
    name: 'topicDetail',
    component: () => import('@/views/Pages/TopicDetail'),
    meta: {
      notShowNav: true
    }
  },
  {
    // 新品
    path: '/pages/newgoods/main',
    name: 'newgoods',
    component: () => import('@/views/Pages/NewOrHot'),
    meta: {
      notShowNav: true
    }
  },
  {
    // 商品详情
    path: '/pages/goods/main',
    name: 'goodsDetail',
    component: () => import("@/views/Pages/goodsDetail"),
    meta: {
      notShowNav: true,
      history: 1
    }
  },
  {
    // 订单
    path: '/pages/order/main',
    name: 'order',
    component: () => import("@/views/Pages/OrderDetail"),
    meta: {
      notShowNav: true,
    }
  },
  {
    // 我的收藏
    path: '/pages/collectlist/main',
    name: 'collectList',
    component: () => import("@/views/Pages/CollectList"),
    meta: {
      notShowNav: true,
    }
  },
  {
    // 地址管理
    path: '/pages/addressSelect/main',
    name: 'addressSelect',
    component: () => import("@/views/Pages/AddressSelect"),
    meta: {
      notShowNav: true,
    }
  },
  {
    // 意见反馈
    path: 'pages/mappage/main',
    name: 'mappage',
    component: () => import("@/views/Pages/Feedback"),
    meta: {
      notShowNav: true,
    }
  },
  {
    // 地图
    path: '/pages/feedback/main',
    name: 'feedback',
    component: () => import("@/views/Pages/MapContainer"),
    meta: {
      notShowNav: true,
    }
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 }), // 管理滚动行为 如果出现滚动 切换就让 让页面回到顶部
})

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch((err) => {
//     if (VueRouter.isNavigationFailure(err)) {
//       // resolve err
//       return err
//     }
//     // rethrow error
//     return Promise.reject(err)
//   })
// }

export default router
