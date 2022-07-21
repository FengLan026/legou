import request from "@/utils/request"

// 获取分类导航数据
export function getCategoryNavData() {
  return request({
    url: "/category/indexaction"
  })
}

// 获取分类列表
export function getCategoryListData(id) {
  return request({
    url: `/category/currentaction?id=${id}`
  })
}

// 获取商品页导航
export function getGoodsNavData(id) {
  return request({
    url: '/category/categoryNav',
    params: {
      id
    }
  })
}

// 获取分类商品列表
export function getGoodsListData(categoryId) {
  return request({
    url: "/goods/goodsList",
    params: {
      categoryId
    }
  })
}
