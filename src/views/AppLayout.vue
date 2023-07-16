<template>
  <!-- Application -->
  <v-app>
    <v-system-bar color="grey lighten-1" app>
      <!-- -->
    </v-system-bar>

    <v-app-bar color="grey lighten-2" app clipped-left>
      <!-- -->
    </v-app-bar>

    <v-navigation-drawer
      color="grey lighten-3"
      app
      clipped
      permanent
      height="100%"
    >
      <!-- -->
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="fill-height">
        <!-- If using vue-router -->
        <router-view />
      </v-container>
    </v-main>

    <v-footer color="grey lighten-2" app>
      <!-- -->
    </v-footer>

    <v-bottom-navigation background-color="grey lighten-1" app>
      <!-- -->
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "AppLayout",

  data() {
    return {
      //
    };
  },
};
</script>

<style scoped lang="scss"></style>
