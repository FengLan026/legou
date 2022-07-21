import request from "@/utils/request"

// 获取购物车列表
export function getCartListData() {
  return request({
    url: "/cart/cartList",
    params: {
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}

// 添加购物车
export function addCartList(goodsId, number) {
  return request({
    url: "/cart/addCart",
    method: 'post',
    data: {
      goodsId,
      number,
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}

// 删除购物车商品
export function delCartList(id) {
  return request({
    url: "/cart/deleteAction",
    params: {
      id
    }
  })
}

// 添加&取消收藏
export function addCollect(goodsId) {
  return request({
    url: "/collect/addcollect",
    method: 'post',
    data: {
      goodsId,
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}

// 订单界面数据
export function orderDetail(addressId) {
  return request({
    url: "/order/detailAction",
    params: {
      addressId,
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}

// 提交订单
export function orderSubmit(allPrise, goodsId) {
  return request({
    url: "/order/submitAction",
    method: 'post',
    data: {
      allPrise,
      goodsId,
      openId: JSON.parse(localStorage.getItem("openId"))
    }
  })
}
