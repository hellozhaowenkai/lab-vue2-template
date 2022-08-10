<template>
  <div class="about">
    <h1>This is an about page</h1>
    <LikeButton
      :initLikeStatus="initLikeStatus"
      @likeStatusChange="likeStatusChange"
    />
  </div>
</template>

<script>
import LikeButton from "@/components/LikeButton";
import { APILike } from "@/api/lab-django-demo";

export default {
  name: "AboutView",

  components: { LikeButton },

  data() {
    return {
      initLikeStatus: false,
    };
  },

  methods: {
    likeStatusChange(isLiked) {
      const lastAddBy = isLiked ? 1 : -1;
      const apiLike = new APILike();
      apiLike.pk = 1;
      apiLike.fields = { lastAddBy };
      apiLike
        // .fetchList()
        // .fetchDetail()
        // .create()
        // .update()
        .updateOrCreate()
        // .drop()
        .then((data) => {
          console.log("data", data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },

  mounted() {
    console.log("$projectConfig", this.$projectConfig);
  },
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
