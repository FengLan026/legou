<template>
  <div>
    <header-back-bar title="搜索" />
    <form action="/">
      <van-search
        v-model="value"
        @input="getSearchKey(value)"
        @change="addHistory"
        show-action
        placeholder="搜索商品"
        :clearable="false"
      />
    </form>
    <keyword-card
      title="历史记录"
      :data="historyData"
      @searchByKey="searchByKey"
    />
    <keyword-card
      title="热门搜索"
      :data="hotKeywordList"
      :clear="false"
      @searchByKey="searchByKey"
    />
    <div class="dialog" v-if="value">
      <div class="header-bar">
        <div
          class="default"
          :class="{ active: active == 0 }"
          @click="
            active = 0;
            order = '';
            getSearchKey();
          "
        >
          综合
        </div>
        <div
          class="price"
          :class="{
            active: active == 1,
            asc: order == 'asc',
            desc: order == 'desc',
          }"
          @click="priceOrder"
        >
          价格
        </div>
      </div>
      <goods-card :data="searchList" />
    </div>
  </div>
</template>

<script>
import { getSearchHistory, getSearchKey, addHistory } from "@/api/search";
import keywordCard from "./components/keywordCard.vue";
export default {
  components: { keywordCard },
  name: "search",
  data() {
    return {
      value: "",
      order: "",
      historyData: [],
      hotKeywordList: [],
      searchList: [],
      active: 0,
    };
  },
  created() {
    this.getSearchHistory();
  },
  methods: {
    async getSearchHistory() {
      const { hotKeywordList, historyData } = await getSearchHistory();
      this.historyData = historyData;
      this.hotKeywordList = hotKeywordList;
      console.log(historyData);
    },
    async getSearchKey() {
      const params = {
        keyword: this.value,
      };
      params.order = this.order;
      const { keywords } = await getSearchKey(params);
      this.searchList = keywords;
    },
    priceOrder() {
      if (this.active != 1) {
        this.active = 1;
        this.order = "asc";
        this.getSearchKey();
      } else if (this.active == 1) {
        if (this.order == "desc") {
          this.order = "asc";
          this.getSearchKey();
          return;
        }
        this.order = "desc";
        this.getSearchKey();
      }
    },
    async addHistory() {
      await addHistory(this.value);
      this.getSearchHistory();
    },
    searchByKey(value) {
      this.value = value;
      this.addHistory();
    },
  },
};
</script>


<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 100px;
  width: 100%;
  background-color: #f4f4f4;
  height: 88%;
  overflow: auto;
  .header-bar {
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    align-items: center;
    text-align: center;
    div {
      width: 50%;
      height: 100%;
      line-height: 40px;
    }
    .active {
      color: #b4282d;
    }
    .default {
      border-right: 1px solid #f4f4f4;
    }
    .price {
      background: url(//yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png)
        112px no-repeat;
      background-size: 10px 15px;
    }
    .price.asc {
      // 从小到大
      background-image: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-636b92c0a5.png);
    }
    .price.desc {
      // 从大到小
      background-image: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-95e035f3e5.png);
    }
  }
}
</style>
