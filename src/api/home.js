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
