import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home"
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
  },
  {
    path: '/pages/branddetail/main',
    name: 'branddetail',
    component: () => import('@/views/Pages/BrandDetail'),
    meta: {
      notShowNav: true
    }
  },
  {
    path: '/pages/topicdetail/main',
    name: 'topicdetail',
    component: () => import('@/views/Pages/TopicDetail'),
     meta: {
      notShowNav: true
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
