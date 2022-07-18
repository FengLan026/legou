<template>
  <div class="container">
    <div class="search-bar">
      <router-link class="search" to="@/views/Search">
        <van-icon name="search" size="16" />
        商品搜索
      </router-link>
    </div>
    <div class="category-bar">
      <van-sidebar class="category-side-bar" v-model="activeKey">
        <van-sidebar-item
          class="category-side-item"
          :title="item.name"
          v-for="item in categoryNav"
          :key="item.id"
          @click="getCategoryListData(item.id)"
        />
      </van-sidebar>
      <div class="category-detail">
        <img :src="categoryDetail.banner_url" alt="" class="banner" />
        <p class="category-title">-- {{ categoryDetail.name }}分类 --</p>
        <ul class="category-list">
          <li
            class="category-item"
            v-for="item in categoryDetail.subList"
            :key="item.id"
            @click="toCategoryGoodsList(item.id)"
          >
            <img class="item-img" :src="item.wap_banner_url" alt="" />
            <p class="item-title">{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryNavData, getCategoryListData } from "@/api/category";
export default {
  data() {
    return {
      activeKey: 0,
      categoryNav: [],
      categoryDetail: [],
      id: 0,
    };
  },
  created() {
    this.getCategoryNavData();
  },
  methods: {
    async getCategoryNavData() {
      const { categoryList } = await getCategoryNavData();
      this.categoryNav = categoryList;
      // console.log(categoryList);
      this.id = categoryList[0].id;
      this.getCategoryListData(this.id);
    },
    async getCategoryListData(id) {
      this.$toast.loading({
        message: "加载中",
        duration: 300,
      });
      const { data } = await getCategoryListData(id);
      console.log(data);
      this.categoryDetail = data.currentOne;
    },
    toCategoryGoodsList(id) {
      this.$router.push({
        path: "/categorylist/main",
        query: { id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100% - 50px);
}
.search-bar {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  background-color: #fff;
  padding: 0 15px;
  .search {
    display: block;
    width: 100%;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border-radius: 4px;
    background-color: #ededed;
  }
}
.category-bar {
  display: flex;
  height: 100%;
  padding-top: 45px;
  border-top: 1px solid #fafafa;
  .category-side-bar {
    position: fixed;
    left: 0;
    width: 84px;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid #fafafa;
    .category-side-item {
      height: 45px;
      padding: 0;
      text-align: center;
      line-height: 45px;
      background-color: #fff;
      .van-sidebar-item__text {
        font-size: 14px;
      }
      &.van-sidebar-item--select {
        color: #ab2b2b;
        font-size: 18px;
        &::before {
          width: 3px;
          height: 100%;
          background-color: #ab2b2b;
        }
      }
    }
  }
  .category-detail {
    margin-left: 84px;
    width: 100%;
    padding: 15px 15px;
    background-color: #fff;
    overflow: auto;
    text-align: center;
    .banner {
      width: 100%;
      height: 110px;
    }
    .category-title {
      padding: 15px 0;
    }
    .category-list {
      display: flex;
      flex-wrap: wrap;
      .category-item {
        width: 33.3%;
        height: 88px;
        margin-bottom: 10px;
        .item-img {
          width: 72px;
          height: 72px;
        }
      }
    }
  }
}
</style>
