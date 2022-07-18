<template>
  <van-nav-bar
    fixed
    placeholder
    class="header-back-bar"
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="$router.back()"
  />
</template>

<script>
export default {
  props: {
    title: {
      default: "不凡",
    },
  },
};
</script>

<style lang="scss" scoped>
.header-back-bar {
  width: 100%;
  height: 46px;
}
</style>
