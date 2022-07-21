import request from "@/utils/request"

// 获取收藏列表
export function getCollectList() {
  return request({
    url: "/collect/listAction",
    params: {
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}

// 意见反馈
export function submitFeedback(content, name, phone) {
  return request({
    url: "/feedback/submitAction",
    params: {
      content,
      name,
      phone,
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}

// 获取收货地址列表
export function getAddressList() {
  return request({
    url: "/address/getListAction",
    params: {
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}

// 获取收货地址详情
export function getAddressDetail(id) {
  return request({
    url: "/address/detailAction",
    params: {
      id
    }
  })
}

// 保存&添加收货地址
export function addAddress(data) {
  return request({
    url: "/address/saveAction",
    method: 'post',
    data: { ...data, openId: JSON.parse(localStorage.getItem("openId")) }
    // data: {
    //   addressId, // 新增不传, 修改传id
    //   checked, // 是否默认
    //   userName,
    //   telNumber,
    //   address, // 省市
    //   detailadress, // 详细地址
    //   openId: JSON.parse(localStorage.getItem("openId"))
    // }
  })
}

// 删除收货地址
export function delAddress(id) {
  return request({
    url: "/address/deleteAction",
    params: {
      id
    }
  })
}
