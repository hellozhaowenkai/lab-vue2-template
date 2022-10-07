<template>
  <div class="index-layout">
    <div class="navigation">
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'about' }">About</router-link>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "IndexLayout",
};
</script>

<style scoped lang="scss">
.navigation {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
