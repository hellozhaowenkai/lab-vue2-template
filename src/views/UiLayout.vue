<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center" @click="$vuetify.theme.dark = true">
        <span class="text-h4">Vuetify</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest/"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>{{ svgIcon.mdiOpenInNew }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="fill-height">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mdiOpenInNew } from "@mdi/js";

export default {
  name: "UiLayout",

  data: () => ({
    svgIcon: { mdiOpenInNew },
  }),
};
</script>

<style scoped lang="scss"></style>
