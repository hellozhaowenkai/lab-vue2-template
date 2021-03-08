<template>
  <div class="about">
    <h1>This is an about page</h1>
    <LikeButton />
  </div>
</template>

<script>
import LikeButton from "@/components/LikeButton";

export default {
  name: "About",

  components: { LikeButton },
};
</script>

<style scoped lang="scss">
.about {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-content: space-between;
}
</style>
