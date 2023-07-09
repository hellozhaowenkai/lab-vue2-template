<template>
  <v-app>
    <v-container class="text-center fill-height">
      <v-row align="center">
        <v-col>
          <h1 class="text-h3 primary--text">Whoops, 404</h1>

          <p>The page you were looking for does not exist</p>

          <v-btn to="/" color="primary" outlined>Get me out of here!</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped lang="scss"></style>
