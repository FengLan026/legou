<template>
  <div>
    <div class="header">
      <div class="serve-item">30天无忧退货</div>
      <div class="serve-item">48小时快速退款</div>
      <div class="serve-item">满88免邮费</div>
    </div>
    <div class="container">
      <van-checkbox-group v-model="chooseGoods" ref="checkboxGroup">
        <van-swipe-cell
          class="swipe-cell"
          v-for="(item, index) in cartList"
          :key="item.goods_id"
        >
          <div class="good-card">
            <div class="good-info">
              <van-checkbox
                class="checkbox"
                :name="index"
                icon-size="20px"
                checked-color="#b4282d"
              />
              <img class="good-img" :src="item.list_pic_url" alt="" />
              <div class="text" @click="toGoodsDetail(item.goods_id)">
                <div class="good-title">{{ item.goods_name }}</div>
                <div class="good-price">￥{{ item.retail_price }}</div>
              </div>
            </div>
            <div class="count">x{{ item.number }}</div>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              color="#b4282d"
              class="delete-button"
              @click="delCartList(item.id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <!-- 提交订单 -->
    <div class="order-bar">
      <van-checkbox
        class="checkAll"
        v-model="isAll"
        icon-size="20px"
        checked-color="#b4282d"
      >
        全选
      </van-checkbox>
      <div class="right">
        <span class="all-price">￥{{ allPrice }}</span>
        <button class="order-button" @click="submit">下单</button>
      </div>
    </div>
  </div>
</template>

<script>
import { orderSubmit } from "@/api/cartList";
import { getCartListData, delCartList } from "@/api/cartList";
export default {
  name: "cart",
  data() {
    return {
      cartList: [],
      chooseGoods: [],
      needGoods: [],
    };
  },
  created() {
    this.getCartListData();
  },
  methods: {
    async getCartListData() {
      const res = await getCartListData();
      console.log(res);
      this.cartList = res.data;
    },
    async delCartList(id) {
      this.$toast.loading("删除中");
      await delCartList(id);
      this.getCartListData();
      this.$toast.clear();
    },
    async submit() {
      if (this.needGoods.length == 0) {
        return this.$toast.fail({
          message: "购物车为空",
          duration: 300,
        });
      } else {
        const goodsId = this.needGoods.join(",");

        await orderSubmit(this.allPrice, goodsId);
        this.$router.push("/pages/order/main");
      }
    },
    toGoodsDetail(id) {
      this.$router.push({
        path: "/pages/goods/main",
        query: {
          id,
        },
      });
    },
  },
  computed: {
    allPrice() {
      this.needGoods = [];
      return this.chooseGoods.reduce((cur, i) => {
        const el = this.cartList[i];
        this.needGoods.push(el.goods_id);
        return cur + el.retail_price * el.number;
      }, 0);
    },
    isAll: {
      get() {
        if (this.cartList.length == this.chooseGoods.length) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        this.$refs.checkboxGroup.toggleAll(value);
      },
    },
  },
};
</script>


<style lang="scss" scoped>
.header {
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
.container {
  background-color: #fff;
  padding: 5px 10px;
  margin-bottom: 60px;
  overflow: auto;
  .swipe-cell {
    padding: 5px 0;
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
.order-bar {
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 8px 2px #f4f4f4;
  .checkAll {
    margin-left: 10px;
  }
  .right {
    height: 100%;
    .all-price {
      display: inline-block;
      height: 100%;
      margin-right: 24px;
      color: #b4282d;
    }
    .order-button {
      width: 100px;
      height: 100%;
      font-size: 15px;
      background-color: #b4282d;
      color: #fff;
    }
  }
}
</style>
