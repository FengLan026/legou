<template>
  <div class="my">
    <div class="header">
      <img
        class="avatar"
        src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png"
        alt=""
      />
      <div class="username">用户</div>
    </div>
    <ul class="list">
      <li class="item" @click="onclick">我的订单</li>
      <li class="item" @click="onclick">优惠卷</li>
      <li class="item" @click="onclick">我的足迹</li>
      <li class="item" @click="$router.push('/pages/collectlist/main')">
        我的收藏
      </li>
      <li class="item" @click="$router.push('/pages/addressSelect/main')">
        地址管理
      </li>
      <li class="item" @click="onclick">联系客服</li>
      <li class="item" @click="onclick">帮助中心</li>
      <li class="item" @click="$router.push('/pages/feedback/main')">
        意见反馈
      </li>
      <li class="item" @click="onclick"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "my",
  methods: {
    onclick() {
      this.$toast.fail({
        message: "开发中",
        duration: 300,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 140px;
  background-color: #333;
  display: flex;
  align-items: center;
  padding: 0 16px;
  .avatar {
    width: 74px;
    height: 74px;
    border-radius: 50%;
  }
  .username {
    margin-left: 16px;
    color: #fff;
    font-size: 14px;
  }
}
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 33.3%;
    line-height: 72px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #f4f4f4;
  }
}
</style>
