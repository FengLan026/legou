<template>
  <van-nav-bar
    fixed
    placeholder
    class="header-back-bar"
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="back"
  />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "不凡",
    },
  },
  computed: {
    history() {
      if (!this.$route.meta.history) {
        return 1;
      } else {
        const history = this.$route.meta.history;
        this.$route.meta.history = 1;
        return history;
      }
    },
  },
  methods: {
    back() {
      this.$router.go(-this.history);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-back-bar {
  ::v-deep .van-nav-bar__content {
    height: 50px;
  }
}
</style>
