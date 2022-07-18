<template>
  <div>
    <header-back-bar />
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getGoodsNavData, getGoodsListData } from "@/api/category";
export default {
  data() {
    return {
      active: 2,
      id: this.$route.query.id,
      categoryId: "",
    };
  },
  created() {
    this.getGoodsNavData();
    // this.getGoodsListData();
  },
  methods: {
    async getGoodsNavData() {
      console.log(this.id);
      const res = await getGoodsNavData(this.id);
      console.log(res);
    },
    async getGoodsListData() {
      const res = await getGoodsListData(this.id);
      console.log(res);
    },
  },
};
</script>

<style>
</style>
