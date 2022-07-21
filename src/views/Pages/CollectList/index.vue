<template>
  <div>
    <header-back-bar title="我的收藏" />
    <goods-card :data="data" align="left" />
    <van-empty
      v-if="data.length == 0"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
    />
  </div>
</template>

<script>
import { getCollectList } from "@/api/my";
import GoodsCard from "@/components/GoodsCard.vue";
export default {
  components: { GoodsCard },
  name: "collectList",
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.getCollectList();
  },
  methods: {
    async getCollectList() {
      const { collectGoodsList } = await getCollectList();
      console.log(collectGoodsList);
      this.data = collectGoodsList;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-image {
  margin-top: 160px;
  ::v-deep .van-empty__image {
    width: 80px;
    height: 80px;
  }
}
</style>
