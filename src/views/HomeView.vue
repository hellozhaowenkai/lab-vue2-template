<template>
  <div class="home-view">
    <img alt="Vue Logo" :src="require('@/assets/lfs/vue-logo.png')" />

    <HelloVue message="Welcome to Your Vue2 + TypeScript App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloVue from "@/components/HelloVue";

export default {
  name: "HomeView",

  components: { HelloVue },
};
</script>

<style scoped lang="scss">
.home-view {
  width: 100%;
}
</style>
