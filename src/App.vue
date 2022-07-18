<template>
  <div id="app">
    <router-view />
    <footer-nav-bar v-if="!this.$route.meta.notShowNav" />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
