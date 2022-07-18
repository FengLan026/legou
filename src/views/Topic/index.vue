<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    loading-text="加载中"
    @load="onLoad"
  >
    <div
      class="good-card"
      v-for="item in topicList"
      :key="item.id"
      @click="toDetail(item.id)"
    >
      <img class="card-img" :src="item.scene_pic_url" alt="" />
      <p class="card-title">{{ item.title }}</p>
      <p class="card-dec">{{ item.subtitle }}</p>
      <p class="card-price">{{ item.price_info }}元起</p>
    </div>
  </van-list>
</template>

<script>
import { getTopicData } from "@/api/topic";
export default {
  data() {
    return {
      page: 1,
      topicList: [],
      total: 0,
      loading: false,
      finished: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await getTopicData(this.page);
      this.total = res.total;
      this.topicList = res.data;
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.page++;
      console.log(this.page);
      const { data } = await getTopicData(this.page);
      console.log(data);
      this.topicList = [...this.topicList, ...data];
      this.$toast.loading({
        message: "加载中",
        duration: 300,
      });
      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.page >= this.total) {
        this.finished = true;
      }
    },
    toDetail(id) {
      this.$router.push({
        path: "/pages/topicdetail/main",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.good-card {
  background-color: #fff;
  width: 100%;
  padding-bottom: 10px;
  text-align: center;
  margin-bottom: 12px;
  .card-img {
    width: 100%;
    height: 208px;
  }
  .card-title {
    font-size: 18px;
    margin: 15px 0;
  }
  .card-dec {
    margin: 12px 0;
    color: #999;
  }
  .card-price {
    margin-bottom: 14px;
    color: #b4282d;
  }
}
</style>
