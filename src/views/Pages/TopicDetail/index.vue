<template>
  <div>
    <header-back-bar title="分类详情" />
    <div v-html="content" class="content"></div>
    <div class="recommend">
      <div class="title">专题推荐</div>
      <ul class="recommend-list">
        <li class="recommend-item" v-for="item in recommendList" :key="item.id">
          <img class="card-img" :src="item.scene_pic_url" alt="" />
          <p class="card-title">{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTopicDetail } from "@/api/topic";
export default {
  data() {
    return {
      id: this.$route.query.id,
      content: "",
      recommendList: [],
    };
  },
  created() {
    this.getTopicDetail();
  },
  methods: {
    async getTopicDetail() {
      const { data, recommendList } = await getTopicDetail(this.id);
      this.content = data.content;
      this.recommendList = recommendList;
      console.log(recommendList);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  ::v-deep img {
    width: 100%;
  }
}
.recommend {
  padding-bottom: 20px;
  .title {
    margin: 30px 0;
    text-align: center;
    color: #999;
    font-size: 15px;
  }
  .recommend-list {
    padding: 0 15px;

    .recommend-item {
      width: 100%;
      padding: 12px 12px 15px;
      margin-top: 12px;
      background-color: #fff;
      .card-img {
        display: block;
        width: 100%;
        height: 140px;
        margin: 0 auto;
      }
      .card-title {
        font-size: 14px;
        padding: 15px 0 14px;
      }
    }
  }
}
</style>
