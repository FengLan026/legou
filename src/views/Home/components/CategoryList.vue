<template>
  <div class="container">
    <div
      class="category-list"
      v-for="(category, index) in categoryList"
      :key="index"
    >
      <p class="title">{{ category.name }}好物</p>
      <ul class="category">
        <li
          class="category-item"
          v-for="el in category.goodsList"
          :key="el.id"
          @click="toGoodsDetail(el.id)"
        >
          <img class="item-img" :src="el.list_pic_url" alt="" />
          <p class="item-name">{{ el.name }}</p>
          <p class="item-price">￥{{ el.retail_price }}</p>
        </li>
        <li class="category-item" @click="toCategoryGoodsList(category.id)">
          <p class="more">{{ category.name }}好物</p>
          <div class="icon"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCategoryListData } from "@/api/category";
export default {
  props: ["categoryList"],
  methods: {
    toGoodsDetail(id) {
      this.$router.push({
        path: "/pages/goods/main",
        query: {
          id,
        },
      });
    },
    async toCategoryGoodsList(id) {
      const { data } = await getCategoryListData(id);
      console.log(data);
      this.$router.push({
        path: "/categorylist/main",
        query: { id: data.currentOne.subList[0].id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 375px;
  margin-bottom: 20px;
  .category-list {
    margin-top: 12px;
    width: 100%;
    height: 920px;
    .title {
      text-align: center;
      padding: 14px;
    }
    .category {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      .category-item {
        background-color: #fff;
        width: 180px;
        height: 215px;
        margin-top: 6px;
        padding: 0 10px;
        .item-img {
          display: block;
          width: 150px;
          height: 150px;
          margin: 0 auto;
        }
        .item-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 12px 0 2px;
        }
        .item-price {
          color: #9c3232;
          margin: 12px 0 2px;
        }
        .more {
          font-size: 16px;
          text-align: center;
          margin-top: 60px;
          margin-bottom: 20px;
        }
        .icon {
          width: 36px;
          height: 36px;
          margin: 0 auto;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABDCAMAAADwFEhBAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUdwTGZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkiFXSYAAAAVdFJOUwDm8Za4KQn7bBFG18herTkZBHyKTt6+JaAAAAIfSURBVFjDtVjbgqsgDCzXgHhB6/z/ry7a3XPUYg0uy0MfsA4hyUwSH4+/XOPglA6SQDJo5YaxFMA7LbFfUjtfgND0lF4KyjXGj4/Rm8apkHaob5gIc5v+rbt42I6dTsjtzEAwCUFMMfssTiKhmAsE+yQId+6+0QnQ014ZoT57zqvPpswSYbi87RAgT73SEXpO+HwP6vKPHDAxQzcBLmvFyf7ZeRlLZiqAWEDozSdG4lnEhifkITo2oC+kVI9gD6jCF2KkY3eWG6KhWBwGou1tWqgbCqPQbmJSfpM11wTmjRnultS5/4Y0EPYWhhVo/kVpetxb009GeKJ4eWJeBCOR/76VvtR4fUJU/e1Jje4XRF3Pt4TIImrOaRG0hGNAYMWRsqQMGNYTeDnaZUHUekfFTbCkMCpzR7W6dGZmQyPRH8vGvDo1wLCZ+g5iVm9K8PmWQLQ9BEakX0JBV2AE2h2IhUy/wHYP1yv4/QtvdjAwpH+zo8Qfi0P2xfblj4K4LNE9+PQVF35+rAV5zOUHO08X3ql8nnL5svB/OuELk7ejykrIi7c8/RjzPYd/6QdLx6yGbM51jKOnvoUcPukpQ9c1hPmo64z6YnT8XF+q1Lka9bZK3a/Rf1Tpg1I/Fn7bj1XpC2v0p1X65Cr9epW5ocr8UmWOStEJVxPfOjUGcz1XnqPY67myynxbZ84+zPvR35r363x32H7/SC+Le98/itYXKn4o0mvBsDUAAAAASUVORK5CYII=)
            no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
