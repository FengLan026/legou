<template>
  <div>
    <header-back-bar />
    <van-tabs v-model="active" @click="tabCategoryList">
      <van-tab
        :title="item.name"
        v-for="item in navData"
        :key="item.id"
        :name="item.id"
      >
        <div class="tab-container">
          <div class="header">
            <p class="title">{{ currentNav.name }}</p>
            <p class="des">{{ currentNav.front_desc }}</p>
          </div>
          <div class="goods-list">
            <p class="none" v-if="listData.length == 0">数据库暂无数据...</p>
            <goods-card :data="listData" />
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getGoodsNavData, getGoodsListData } from "@/api/category";
export default {
  name:'categorylist',
  data() {
    return {
      active: 0,
      id: this.$route.query.id,
      navData: [],
      currentNav: {},
      listData: [],
    };
  },
  created() {
    this.getGoodsNavData();
  },
  methods: {
    async getGoodsNavData() {
      const res = await getGoodsNavData(this.id);
      this.navData = res.navData;
      this.active = res.currentNav.id;
      this.getGoodsListData(res.currentNav.id);
    },
    async getGoodsListData(id) {
      this.$toast.loading("加载中");
      const res = await getGoodsListData(id);
      this.currentNav = res.currentNav;
      this.listData = res.data;
      this.$toast.clear();
    },
    tabCategoryList(id) {
      this.getGoodsListData(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-container {
  padding-top: 12px;
  .header {
    width: 100%;
    height: 100px;
    padding: 15px;
    background-color: #fff;
    text-align: center;
    .title {
      font-size: 15px;
      color: #333;
      margin: 15px 0;
    }
    .des {
      color: #999;
    }
  }
  .goods-list {
    .none {
      color: #999;
      text-align: center;
      margin-top: 50px;
    }
  }
}
</style>
