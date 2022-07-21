import request from "@/utils/request"

// 获取关键词和搜索历史接口
export function getSearchHistory() {
  return request({
    url: "/search/indexaction",
    params: {
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}

// 搜索提示
export function getSearchKey(params) {
  return request({
    url: "/search/helperaction",
    params
  })
}

// 关键词添加到历史记录
export function addHistory(keyword) {
  return request({
    url: "/search/addhistoryaction",
    method: 'post',
    data: {
      keyword,
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}

// 清空搜索历史
export function clearHistory() {
  return request({
    url: "/search/clearhistoryAction",
    method: 'post',
    data: {
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}
