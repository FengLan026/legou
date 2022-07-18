<template>
  <ul class="goods-list">
    <li class="goods-item" v-for="item in data" :key="item.id">
      <img class="goods-img" :src="item.list_pic_url" alt="" />
      <p class="title">{{ item.name }}</p>
      <p class="price">￥{{ item.retail_price }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  .goods-item {
    width: 186px;
    background-color: #fff;
    padding: 12px 18px;
    text-align: center;
    margin-top: 4px;
    .goods-img {
      width: 150px;
      height: 150px;
    }
    .title {
      margin: 8px 0;
      width: 100%;
    }
    .price {
      font-size: 15px;
      margin: 16px 0;
      color: #b4282d;
    }
  }
}
</style>
