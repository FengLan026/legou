<template>
  <div>
    <header-back-bar title="订单" />
    <van-cell is-link class="address-cell" @click="selectAddress">
      <div class="address-card">
        <div class="name">{{ data.address.name }}</div>
        <div class="address-info">
          <div class="tel">{{ data.address.mobile }}</div>
          <div
            class="addrress"
            v-if="data.address.address && data.address.address_detail"
          >
            {{ data.address.address + data.address.address_detail }}
          </div>
        </div>
      </div>
    </van-cell>
    <div class="info">
      <div class="item">
        <div>商品合计</div>
        <div>￥{{ data.allPrise }}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item last">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>
    <div class="container">
      <van-swipe-cell
        class="swipe-cell"
        v-for="item in data.goodsList"
        :key="item.goods_id"
      >
        <div class="good-card">
          <div class="good-info">
            <img class="good-img" :src="item.list_pic_url" alt="" />
            <div class="text">
              <div class="good-title">{{ item.goods_name }}</div>
              <div class="good-price">￥{{ item.retail_price }}</div>
            </div>
          </div>
          <div class="count">x{{ item.number }}</div>
        </div>
      </van-swipe-cell>
    </div>
    <div class="footer-none"></div>
    <div class="footer">
      <div>实付: ￥{{ data.allPrise }}</div>
      <button class="pay" @click="$toast.fail('开发中')">支付</button>
    </div>
  </div>
</template>

<script>
import { orderDetail } from "@/api/cartList";
export default {
  data() {
    return {
      data: {
        address: {},
        allPrise: "",
        goodsList: {},
      },
      addressId: this.$store.getters.addressId,
    };
  },
  created() {
    this.orderDetail();
  },
  methods: {
    async orderDetail() {
      this.$toast.loading("加载中");
      let res = {};
      if (this.addressId != "") {
        res = await orderDetail(this.addressId);
      } else {
        res = await orderDetail();
      }
      console.log(res);
      this.data = res;
      this.$toast.clear();
    },
    selectAddress() {
      this.$router.push({
        path: "/pages/addressSelect/main",
        query: {
          model: "select",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.address-cell {
  margin-top: 4px;
  padding: 0;
  align-items: center;
  padding-right: 16px;
  .address-card {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #fff;
    line-height: 16px;
    .name {
      width: 70px;
      text-align: center;
      padding: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .address-info {
      .tel {
        margin: 12px 0;
      }
      .addrress {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 12px 0;
      }
    }
  }
}
.info {
  width: 100%;
  background-color: #fff;
  margin-top: 12px;
  padding: 0 12px;
  .item {
    display: flex;
    line-height: 48px;
    justify-content: space-between;
    border-bottom: 1px solid #d9d9d9;
    &.last {
      border-bottom: none;
    }
  }
}
.container {
  background-color: #fff;
  padding: 5px 10px;
  margin-top: 12px;
  margin-bottom: 20px;
  overflow: auto;
  .swipe-cell {
    padding: 5px 0;
    .good-card:last-child {
      border-bottom: none;
    }
    .good-card {
      border-bottom: 1px solid #f4f4f4;
      height: 96px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .good-info {
        display: flex;
        align-items: center;

        .good-img {
          margin-left: 12px;
          background-color: #f4f4f4;
          width: 62px;
          height: 62px;
        }
        .text {
          margin-left: 12px;
          .good-title {
            margin: 12px 0;
          }
          .good-price {
            margin: 12px 0;
          }
        }
      }
      .count {
        margin-right: 24px;
      }
    }
    .van-swipe-cell__right {
      .delete-button {
        border: 0;
      }
    }
  }
  .delete-button {
    height: 100%;
  }
}
.footer-none {
  width: 100%;
  height: 50px;
}
.footer {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 12px;
  .pay {
    width: 100px;
    height: 100%;
    font-size: 15px;
    background-color: #b4282d;
    color: #fff;
  }
}
</style>
