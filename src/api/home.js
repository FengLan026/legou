import request from "@/utils/request"

// 获取首页数据
export function getHomeData() {
  return request({
    url: "/index/index"
  })
}

// 首页品牌制造商直供的详情数据
export function getBrandDetailData(id) {
  return request({
    url: `/brand/detailaction?id=${id}`,
  })
}

// 新品首发&人气推荐
// order 排序asc 价格从小到大展示 desc 价格从大到小展示
export function getNewOrHot(params) {
  return request({
    url: '/goods/goodsList',
    params
  })
}
