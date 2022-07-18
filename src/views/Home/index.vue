<template>
  <div>
    <!-- 搜索栏 -->
    <van-row class="search-bar" type="flex" align="center">
      <van-col :span="4" class="address">
        <span>定位</span>
      </van-col>
      <van-col :span="12">
        <van-field
          class="search"
          left-icon="search"
          placeholder="搜索商品"
          readonly
        />
      </van-col>
    </van-row>
    <!-- banner -->
    <van-swipe class="banner-swipe" :autoplay="2000">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img class="banner-img" :src="item.image_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 频道 -->
    <van-grid column-num="5" class="channel-bar">
      <van-grid-item v-for="item in channel" :key="item.id">
        <template>
          <img width="29" :src="item.icon_url" alt="" />
          <p class="channel-name">{{ item.name }}</p>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 品牌制造商 -->
    <div class="brand-bar">
      <p class="header">品牌制造商直供</p>
      <div class="brand-list">
        <router-link
          class="brand-item"
          v-for="item in brandList"
          :key="item.id"
          :to="{ path: '/pages/branddetail/main', query: { id: item.id } }"
        >
          <img :src="item.new_pic_url" alt="" />
          <div class="text">
            <p>{{ item.name }}</p>
            <p class="price">{{ item.floor_price }}元起</p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 新品 -->
    <goods-show-bar :listData="newGoods" bgImg="0" />
    <!-- 热门 -->
    <goods-show-bar :listData="hotGoods" bgImg="1" />
    <!-- 专题精选 -->
    <div class="topic-list">
      <p class="title">专题精选</p>
      <div class="content">
        <div class="topic-item" v-for="item in topicList" :key="item.id">
          <img class="topic-img" :src="item.item_pic_url" alt="" />
          <div class="text">
            <span class="item-title">{{ item.title }}</span>
            <span class="item-price">{{ item.price_info }}元起</span>
          </div>
          <p class="des">{{ item.subtitle }}</p>
        </div>
      </div>
    </div>
    <!-- 分类列表 -->
    <category-list :categoryList="newCategoryList" />
  </div>
</template>

<script>
import { getHomeData } from "@/api/home";
import GoodsShowBar from "./components/GoodsShowBar.vue";
import CategoryList from "./components/CategoryList.vue";
export default {
  components: { GoodsShowBar, CategoryList },
  data() {
    return {
      banner: [], // 轮播
      channel: [], // 频道
      brandList: [], // 品牌制造商
      newGoods: [], // 新品
      hotGoods: [], // 人气推荐
      topicList: [], // 专题
      newCategoryList: [], // 分类
    };
  },
  created() {
    this.getHomeData();
  },
  methods: {
    async getHomeData() {
      const res = await getHomeData();
      console.log(res);
      this.banner = res.banner;
      this.brandList = res.brandList;
      this.channel = res.channel;
      this.newGoods = res.newGoods;
      this.hotGoods = res.hotGoods;
      this.topicList = res.topicList;
      this.newCategoryList = res.newCategoryList;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  height: 44px;
  background-color: #fff;
  .address {
    text-align: center;
  }
  .search {
    text-indent: 8px;
  }
}
.banner-swipe {
  width: 100%;
  height: 200px;
  margin-top: 2px;
  background-color: #fff;
  .banner-img {
    width: 100%;
  }
  ::v-deep .van-swipe__indicators {
    .van-swipe__indicator {
      background-color: #333;
    }
    .van-swipe__indicator .van-swipe__indicator--active {
      background-color: #000;
    }
  }
}
.channel-bar {
  ::v-deep .van-grid-item__content {
    padding-top: 8px;
    padding-bottom: 20px;
    .channel-name {
      margin-top: 20px;
    }
  }
}
.brand-bar {
  width: 100%;
  margin-top: 14px;
  background-color: #fff;
  .header {
    padding: 22px 0;
    text-align: center;
  }
  .brand-list {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .brand-item {
      position: relative;
      width: 48%;
      height: 120px;
      margin-bottom: 4px;
      img {
        width: 100%;
        height: 100%;
      }
      .text {
        position: absolute;
        top: 16px;
        left: 4px;
        .price {
          margin-top: 14px;
        }
      }
    }
  }
}
.topic-list {
  height: 305px;
  background-color: #fff;
  margin-top: 12px;
  .title {
    width: 100%;
    padding: 18px;
    text-align: center;
  }
  .content {
    display: flex;
    overflow: auto;
    padding: 0 6px;
    .topic-item {
      min-width: 300px;
      height: 250px;
      padding: 0 6px;
      .topic-img {
        display: block;
        margin: 0 auto;
        width: 288px;
        height: 160px;
      }
      .text {
        display: flex;
        justify-content: space-between;
        padding: 4px 0 15px;
        .item-title {
          display: inline-block;
          font-size: 16px;
          font-weight: 700;
        }
        .item-price {
          display: inline-block;
          color: #9c3232;
        }
      }
      .des {
        color: #8a8a8a;
        margin: 4px 0 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
