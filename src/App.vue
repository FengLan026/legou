<template>
  <div id="app">
    <router-view :key="key" />
    <footer-nav-bar v-if="!$route.meta.notShowNav" />
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>
