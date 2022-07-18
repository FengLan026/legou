import request from "@/utils/request"

// 获取专题数据
export function getTopicData(page) {
  return request({
    url: `/topic/listaction?page=${page}`
  })
}

// 获取专题详情
export function getTopicDetail(id) {
  return request({
    url: `/topic/detailaction?id=${id}`
  })
}
