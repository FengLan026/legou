<template>
  <div>
    <header-back-bar title="意见与反馈" />
    <van-form
      :show-error-message="false"
      :show-error="false"
      @submit="onSubmit"
      @failed="$toast.fail('请输入内容')"
    >
      <van-field
        v-model="content"
        name="content"
        label="留言"
        placeholder="请填写你的意见与反馈"
        type="textarea"
        rows="3"
        autosize
        maxlength="150"
        show-word-limit
        :rules="[{ required: true, message: '请填写你的意见与反馈' }]"
      />
      <van-field
        v-model="phone"
        name="phone"
        label="联系方式"
        placeholder="邮箱/手机号/微信号"
        :rules="[{ required: true, message: '请填写你的联系方式' }]"
      />
      <div style="margin: 32px">
        <van-button block type="info" color="#b4282d" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "feedback",
  data() {
    return {
      content: "",
      phone: "",
    };
  },
  methods: {
    onSubmit() {
      this.$toast.fail("提交成功");
      this.content = "";
      this.phone = "";
    },
  },
};
</script>

<style>
</style>
