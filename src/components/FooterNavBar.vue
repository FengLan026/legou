<template>
  <van-tabbar route fixed placeholder>
    <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/topic" icon="description">专题</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/my" icon="friends-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.van-tabbar-item--active {
  color: rgb(195, 85, 89);
}
</style>
