<template>
  <div>
    <header-back-bar />
    <div class="header">
      <div class="header-title">
        <img
          class="header-img"
          src="http://yanxuan.nosdn.127.net/1541445967645114dd75f6b0edc4762d.png"
          alt=""
        />
        <div class="title">{{ data.name }}</div>
      </div>
      <div class="dec">{{ data.simple_desc }}</div>
    </div>
    <div class="container">
      <p v-if="goodsList.length == 0" class="none">数据库暂无数据...</p>
      <goods-card :data="goodsList" />
    </div>
  </div>
</template>

<script>
import { getBrandDetailData } from "@/api/home";
export default {
  data() {
    return {
      id: this.$route.query.id,
      data: [],
      goodsList: [],
    };
  },
  created() {
    this.getBrandDetailData();
  },
  methods: {
    async getBrandDetailData() {
      const { data, goodsList } = await getBrandDetailData(this.id);
      this.data = data;
      this.goodsList = goodsList;
      console.log(data);
      console.log(goodsList);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  .header-title {
    position: relative;
    .header-img {
      width: 100%;
      height: 145px;
    }
    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 20px;
      padding-bottom: 4px;
      border-bottom: 2px solid #fff;
    }
  }
  .dec {
    background-color: #fff;
    text-align: center;
    font-size: 15px;
    padding: 20px 16px;
    color: #666;
    line-height: 20px;
  }
}
.container {
  margin-top: 8px;
  .none {
    text-align: center;
    color: #999;
    font-size: 16px;
    margin-top: 100px;
  }
}
</style>
