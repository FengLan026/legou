<template>
  <div class="card" v-if="data.length != 0">
    <div class="header">
      <div class="title">{{ title }}</div>
      <van-icon
        name="delete-o"
        class="clear-btn"
        size="18"
        v-if="clear"
        @click.native="clearBtn"
      />
    </div>
    <ul class="keyword-list">
      <li
        class="keyword-item"
        :class="{ hot: item.is_hot == 1 }"
        v-for="item in data"
        :key="item.keyword"
        @click="searchByKey(item.keyword)"
      >
        {{ item.keyword }}
      </li>
    </ul>
  </div>
</template>

<script>
import { clearHistory } from "@/api/search";
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    clear: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    searchByKey(value) {
      this.$emit("searchByKey", value);
    },
    async clearBtn() {
      this.$toast.loading("正在清除历史记录");
      await clearHistory();
      this.$parent.getSearchHistory();
      this.$toast.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  background-color: #fff;
  padding: 16px;
  margin-bottom: 10px;
  .header {
    line-height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 14px;
      margin-left: 8px;
    }
  }
  .keyword-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    .keyword-item {
      border: 1px solid #333;
      padding: 4px 8px;
      margin: 8px;
      white-space: nowrap;
    }
    .hot {
      color: #b4282d;
      border-color: #b4282d;
    }
  }
}
</style>
