<template>
  <van-swipe-cell class="swipe-card">
    <div class="card">
      <div class="name">
        {{ data.name }}
        <div class="default" v-if="data.is_default == 1">默认</div>
      </div>
      <div class="info">
        <div class="tel">{{ data.mobile }}</div>
        <div class="addrress">{{ data.address + data.address_detail }}</div>
      </div>
      <img
        class="edit"
        src="http://jinglins.gitee.io/legou/img/edit.d508a455.png"
        @click="editBtn"
      />
    </div>
    <template #right>
      <van-button square type="danger" text="删除" @click="delAddress" />
    </template>
  </van-swipe-cell>
</template>

<script>
import { delAddress } from "@/api/my";
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editBtn() {
      this.$parent.showDialog = true;
      this.$parent.addressData = {
        addressId: this.data.id, // 新增不传, 修改传id
        checked: this.data.is_default, // 是否默认
        userName: this.data.name, // 名字
        telNumber: this.data.mobile, // 手机号
        address: this.data.address, // 省市
        detailadress: this.data.address_detail, // 详细地址
      };
    },
    delAddress() {
      this.$dialog
        .confirm({
          message: "是否删除该地址",
        })
        .then(async () => {
          await delAddress(this.data.id);
          this.$parent.getAddressList();
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.swipe-card {
  border-bottom: 1px solid #d9d9d9;
  .van-swipe-cell__right {
    .van-button {
      border: 0;
      height: 100%;
      background-color: #eb5648;
    }
  }
  .card {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
      .default {
        width: 32px;
        height: 16px;
        color: #b4282d;
        border: 1px solid #b4282d;
        margin: 0 auto;
        margin-top: 4px;
      }
    }
    .info {
      flex: 1;
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
    .edit {
      width: 25px;
      height: 25px;
      margin: 10px;
    }
  }
}
</style>
