<template>
  <div>
    <header-back-bar :title="title" />
    <div class="header">
      <img
        class="header-img"
        src="http://yanxuan.nosdn.127.net/8976116db321744084774643a933c5ce.png"
        alt=""
      />
      <div class="header-bar">
        <div
          class="default"
          :class="{ active: active == 0 }"
          @click="
            active = 0;
            order = '';
            getNewOrHot();
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
    </div>
    <goods-card :data="data" />
  </div>
</template>

<script>
import { getNewOrHot } from "@/api/home";
export default {
  data() {
    return {
      data: [],
      active: 0,
      order: "",
    };
  },
  created() {
    this.getNewOrHot();
  },
  computed: {
    params() {
      if (this.$route.query.model == "new") {
        return {
          isNew: 1,
        };
      } else if (this.$route.query.model == "hot") {
        return {
          isHot: 1,
        };
      }
    },
    title() {
      if (this.$route.query.model == "new") {
        return "新品首发";
      } else if (this.$route.query.model == "hot") {
        return "人气推荐";
      }
    },
  },
  methods: {
    async getNewOrHot() {
      this.params.order = this.order;
      const { data } = await getNewOrHot(this.params);
      console.log(data);
      this.data = data;
    },
    priceOrder() {
      if (this.active != 1) {
        this.active = 1;
        this.order = "asc";
        this.getNewOrHot();
      } else if (this.active == 1) {
        if (this.order == "desc") {
          this.order = "asc";
          this.getNewOrHot();
          return;
        }
        this.order = "desc";
        this.getNewOrHot();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  .header-img {
    width: 100%;
    height: 140px;
  }
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
