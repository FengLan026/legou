<template>
  <div>
    <header-back-bar title="地址管理" />
    <div class="container">
      <address-card
        class="address-card"
        v-for="item in addressList"
        :key="item.id"
        :data="item"
        @click.native="selectAddress(item.id)"
      />
    </div>
    <div class="footer-none"></div>
    <div class="footer">
      <van-button icon="plus" class="addBtn" @click="showDialog = true"
        >新增地址</van-button
      >
    </div>
    <van-popup
      class="dialog"
      v-model="showDialog"
      position="bottom"
      :style="{ height: '50%' }"
      closeable
      @closed="closeBtn"
    >
      <van-form @submit="onSubmit" error-message-align="right" ref="form">
        <van-field
          v-model="addressData.userName"
          name="userName"
          placeholder="姓名"
          :rules="rules.userName"
        />
        <van-field
          v-model="addressData.telNumber"
          name="telNumber"
          type="tel"
          placeholder="手机号码"
          :rules="rules.telNumber"
        />

        <van-field
          readonly
          clickable
          name="address"
          :value="addressData.address"
          :rules="rules.address"
          placeholder="省份、城市、区县"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirm"
            @cancel="showArea = false"
          />
        </van-popup>
        <van-field
          v-model="addressData.detailadress"
          name="detailadress"
          placeholder="详细地址，如楼道、楼盘号等"
          :rules="rules.detailadress"
        />
        <van-field name="checked">
          <template #input>
            <van-checkbox v-model="addressData.checked" shape="square">
              设为默认地址
            </van-checkbox>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            保存
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import AddressCard from "./components/AddressCard.vue";
import { areaList } from "@vant/area-data";
import { getAddressList, getAddressDetail, addAddress } from "@/api/my";
export default {
  components: { AddressCard },
  name: "addressSelect",
  data() {
    const validMobile = (val, rule) => {
      return /^1[3-9]\d{9}$/.test(val);
    };
    return {
      addressList: [],
      showDialog: false,
      addressData: {
        addressId: "", // 新增不传, 修改传id
        checked: false, // 是否默认
        userName: "", // 名字
        telNumber: "", // 手机号
        address: "", // 省市
        detailadress: "", // 详细地址
      },
      showArea: false,
      areaList, // 数据格式见 Area 组件文档
      rules: {
        userName: [
          { required: true, trigger: "onBlur", message: "姓名不能为空" },
        ],
        telNumber: [
          { required: true, trigger: "onBlur", message: "手机号不能为空" },
          {
            trigger: "onBlur",
            validator: validMobile,
            message: "手机号格式错误",
          },
        ],
        address: [
          { required: true, trigger: "onBlur", message: "地址不能为空" },
        ],
        detailadress: [
          { required: true, trigger: "onBlur", message: "地址不能为空" },
        ],
      },
    };
  },
  created() {
    this.getAddressList();
  },
  methods: {
    async onSubmit() {
      await addAddress(this.addressData);
      this.getAddressList();
      this.showDialog = false;
    },
    onConfirm(values) {
      this.addressData.address = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join(" ");
      this.showArea = false;
    },
    closeBtn() {
      this.addressData = {
        addressId: "", // 新增不传, 修改传id
        checked: false, // 是否默认
        userName: "", // 名字
        telNumber: "", // 手机号
        address: "", // 省市
        detailadress: "", // 详细地址
      };
      this.$refs.form.resetValidation();
    },
    async getAddressList() {
      const { data } = await getAddressList();
      console.log(data);
      this.addressList = data;
      const defaultId = data[0].id;
      this.$store.commit("address/setAddressId", defaultId);
    },
    async getAddressDetail(id) {
      const res = await getAddressDetail(id);
      console.log(res);
    },
    selectAddress(id) {
      if (!this.$route.query.model) return;
      if (this.$route.query.model == "select") {
        this.$store.commit("address/setAddressId", id);
        this.$router.back();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: fit-content;
  padding: 8px;
  background-color: #fff;
  margin-bottom: 20px;
  overflow: auto;
  .address-card:last-child {
    border-bottom: 0;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .addBtn {
    width: 90%;
    height: 40px;
    border: 1px solid #b4282d;
    color: #b4282d;
    font-size: 12px;
  }
}
.footer-none {
  width: 100%;
  height: 72px;
}

.dialog {
  padding: 16px;
  padding-top: 32px;
  overflow: hidden;
  ::v-deep .van-field__value {
    display: flex;
    justify-content: space-between;
    .van-field__body {
      width: 70%;
    }
  }
}
</style>
