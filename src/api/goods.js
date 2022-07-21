import request from "@/utils/request"

// 获取商品详情
export function getCategoryNavData(id) {
  return request({
    url: "/goods/detailaction",
    params: {
      id,
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}
