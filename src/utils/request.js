import axios from "axios"
import qs from 'qs'
import { Toast } from "vant"
const request = axios.create({
  // 接口的基地址
  baseURL: '/bufan',
  timeout: 5000
})

var userInfo = {
  "openId": "597565972",
  "nickName": "舒畅",
  "avatarUrl": "https://th.bing.com/th/id/OIP.rTNXOEGFkCiB2MLEUC8WnQAAAA?pid=ImgDet&rs=1"
}
var openId = userInfo.openId

// 请求拦截器
request.interceptors.request.use(config => {
  if (!localStorage.getItem("openId") && !localStorage.getItem("userInfo")) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
    localStorage.setItem("openId", openId)
  }
  if (config.method.toLowerCase() == 'post') {
    // qs系列化
    // https://www.npmjs.com/package/qs
    //  arrayFormat: 'repeat' 作用:  { a: ['b', 'c'] }  ==> 'a=b&a=c'
    //  allowDots: true  作用: { a: { b: { c: 'd', e: 'f' } } }  ==>  'a.b.c=d&a.b.e=f'
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat', allowDots: true })
  } else {
    // config.params = config.data
    return config
  }
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  // axios 默认加了一层data
  const { data } = response
  return data
}, error => {
  Toast.fail(error.message)
  return Promise.reject(error)
})

export default request
