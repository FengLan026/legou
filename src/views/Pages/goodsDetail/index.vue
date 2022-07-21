<template>
  <div>
    <header-back-bar />
    <div class="container">
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="item in swipeImg" :key="item.id">
          <img class="swipe-img" :src="item.img_url" alt="" />
        </van-swipe-item>
      </van-swipe>
      <div class="serve">
        <div class="serve-item">30天无忧退货</div>
        <div class="serve-item">48小时快速退款</div>
        <div class="serve-item">满88免邮费</div>
      </div>
      <div class="detail">
        <div class="detail-header">
          <p class="title">{{ data.info.name }}</p>
          <p class="des">{{ data.info.goods_brief }}</p>
          <p class="price">￥{{ data.info.retail_price }}</p>
        </div>
        <van-cell
          class="goods-count"
          center
          title="请选择规格数量"
          @click="showPopup"
          is-link
        />
        <van-popup class="popup" v-model="show" closeable position="bottom">
          <div class="top">
            <img class="good-img" :src="data.info.primary_pic_url" alt="" />
            <div class="text">
              <p class="price">价格￥{{ data.info.retail_price }}</p>
              <p>请选择数量</p>
            </div>
          </div>
          <div class="count">
            <div>数量</div>
            <van-stepper v-model="count" integer />
          </div>
        </van-popup>
        <div class="detail-info">
          <p class="info-title">商品参数</p>
          <div
            class="info-item"
            v-for="item in data.attribute"
            :key="item.name"
          >
            <div class="info-name">{{ item.name }}</div>
            <div class="info-value">{{ item.value }}</div>
          </div>
        </div>
        <div class="goods-des" v-html="data.info.goods_desc"></div>
        <!-- 商品推荐 -->
        <div class="product-list">
          <div class="header">
            <div class="line"></div>
            <div class="title">大家都在看</div>
            <div class="line"></div>
          </div>
          <goods-card
            class="product-item"
            :data="data.productList"
            align="left"
          />
        </div>
      </div>
    </div>
    <!-- 底栏 -->
    <van-row class="footer" type="flex" align="center">
      <van-col span="4">
        <div class="item">
          <van-icon
            class="icon"
            :class="{ 'icon-coll': activeColl }"
            name="star-o"
            size="24"
            @click="activeColl = !activeColl"
          />
        </div>
      </van-col>
      <van-col span="4">
        <div class="item">
          <van-icon
            class="icon"
            name="cart-o"
            size="24"
            :badge="data.allnumber"
            @click="$router.push('/cart')"
          />
        </div>
      </van-col>
      <van-col
        span="8"
        @click="$toast.fail({ message: '开发中', duration: 300 })"
      >
        <div class="item">立即购买</div>
      </van-col>
      <van-col span="8">
        <div class="item addCart" @click="addShopCart">加入购物车</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getCategoryNavData } from "@/api/goods";
import { addCartList, addCollect } from "@/api/cartList";
export default {
  name: "goodDetail",
  data() {
    return {
      show: false, // 商品数量弹窗
      count: 1, // 商品数量
      id: this.$route.query.id, // 商品id
      swipeImg: [], // 轮播图
      data: {
        info: "",
      },
      allnumber: "",
      activeColl: false, // 收藏按钮激活
      isColl: false, // 记录收藏信息
    };
  },
  created() {
    this.getCategoryNavData();
  },
  methods: {
    // 获取数据
    async getCategoryNavData() {
      this.$toast.loading("加载中");
      const res = await getCategoryNavData(this.id);
      this.swipeImg = res.gallery;
      this.data = res;
      this.isColl = this.activeColl = res.collected;
      this.$toast.clear();
    },
    // 显示弹层
    showPopup() {
      this.show = true;
    },
    // 加入购物车
    async addShopCart() {
      if (this.show) {
        this.$toast.success("添加成功");
        await addCartList(this.id, this.count);
        const res = await getCategoryNavData(this.id);
        this.data = res;
        this.$toast.clear();
      } else {
        this.show = true;
      }
    },
    // 收藏商品
    async addColl() {
      await addCollect(this.id);
    },
  },

  beforeRouteUpdate(to, from, next) {
    if (to.query.id == from.query.id) {
      next(false);
    } else {
      this.$route.meta.history++;
      this.id = to.query.id;
      this.getCategoryNavData();
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isColl != this.activeColl) {
      // 如果收藏按钮改变, 发送请求
      this.isColl != this.activeColl;
      this.addColl();
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  // background-color: #39a9ed;
  .swipe-img {
    width: 100%;
    height: 375px;
  }
}
.serve {
  display: flex;
  height: 40px;
  line-height: 40px;
  justify-content: space-between;
  padding: 0 8px;
  .serve-item {
    background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png)
      0 no-repeat;
    background-size: 6px 6px;
    padding-left: 12px;
    align-items: center;
    color: #666;
  }
}
.detail {
  .detail-header {
    width: 100%;
    height: 150px;
    background-color: #fff;
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
    overflow: hidden;
    .title {
      font-size: 20px;
      margin: 20px 0;
    }
    .des {
      color: #999;
    }
    .price {
      font-size: 18px;
      color: #b4282d;
      margin: 20px 0;
    }
  }
  .goods-count {
    height: 54px;
    font-size: 12px;
  }
  .popup {
    overflow-y: hidden;
    margin-bottom: 50px;
    .top {
      display: flex;
      padding: 16px;
      padding-bottom: 0;
      .good-img {
        width: 88px;
        height: 88px;
      }
      .text {
        padding: 12px;
        line-height: 30px;
        .price {
          color: #b4282d;
        }
      }
    }
    .count {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
    }
  }
  .detail-info {
    margin-top: 12px;
    padding: 24px;
    background-color: #fff;

    .info-title {
      font-size: 20px;
    }
    .info-item {
      display: flex;
      background-color: #f4f4f4;
      margin-top: 8px;
      line-height: 40px;
      .info-name {
        width: 66px;
        white-space: nowrap;
        color: #999;
      }
      .info-value {
        flex: 1;
        margin-left: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .goods-des {
    ::v-deep img {
      width: 100%;
    }
  }
  .product-list {
    .header {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      background-color: #fff;
      .line {
        width: 50px;
        height: 1px;
        margin: 0 10px;
        background-color: #ccc;
      }
    }
  }
}
.footer {
  width: 100%;
  height: 52px;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  text-align: center;
  background-color: #fff;
  .van-col {
    height: 100%;
    line-height: 52px;
    .icon {
      vertical-align: middle;
    }
    .icon.icon-coll {
      color: #b4282d;
    }
    .item {
      border: 1px solid #f4f4f4;
    }
    .addCart {
      background-color: #b4282d;
      color: #fff;
    }
  }
}
</style>
