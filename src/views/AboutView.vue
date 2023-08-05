<template>
  <div class="about" v-resize="onResize">
    <h1>This is an about page</h1>

    <LikeButton
      :initialLikeStatus="initialLikeStatus"
      @likeStatusChange="likeStatusChange"
    />

    <v-card class="card" style="margin: auto">
      <v-card-title class="ma-2">
        <v-badge :content="String(likeModule.totalCount)">
          {{ websiteTitle }}
        </v-badge>
      </v-card-title>

      <v-card-subtitle
        ref="subtitleDOM"
        :class="isLiked ? 'green--text' : 'red--text'"
        :style="{ fontFamily: `'Source Code Pro', sans-serif` }"
      >
        {{ noRecords ? "Hello." : "Thanks!" }}
      </v-card-subtitle>

      <v-card-text v-if="noRecords">No one likes this?</v-card-text>
      <v-card-text v-else>
        <v-row align="center" align-content="center" justify="space-around">
          <v-col
            v-for="(item, indexOfArray) in allRecords"
            :key="indexOfArray"
            cols="auto"
            align-self="center"
          >
            <v-icon x-large>{{ svgIcon.mdiAccountCircle }}</v-icon>

            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr
                    v-for="(value, key, indexOfObject) in item"
                    :key="indexOfObject"
                    :class="['text-left', $style.backgroundColorSlate200]"
                  >
                    <td class="table__header-text_font_bold">{{ key }}</td>
                    <td>{{ value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>

      <transition name="slide-fade">
        <v-card-actions v-show="isLiked">
          <v-text-field
            solo
            clearable
            type="text"
            label="Say something?"
            v-model.trim="message"
            :prepend-icon="svgIcon.mdiMessage"
          >
            <template v-slot:append-outer>
              <v-icon
                color="primary"
                :disabled="!message"
                @click.stop="(event) => allRecordsPush(message, event)"
              >
                {{ svgIcon.mdiSend }}
              </v-icon>
            </template>
          </v-text-field>
        </v-card-actions>
      </transition>
    </v-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mdiAccountCircle, mdiMessage, mdiSend } from "@mdi/js";
import LikeButton from "@/components/LikeButton";
import { logger } from "@/helpers/logging";
import { ApiLikeModel } from "@/api/lab-django-template";
import { ERROR_STATUS_CODE, OPERATION_API_STATE } from "@/restful";
import {
  DEFAULT_LIKE,
  GET_LIKE,
  UPDATE_LIKE,
  CHANGE_LIKE,
} from "@/store/flux-types";

export default {
  name: "AboutView",

  components: { LikeButton },

  data() {
    return {
      websiteTitle: this.$projectConfig["base"]["website-title"],
      svgIcon: { mdiAccountCircle, mdiMessage, mdiSend },
      likePk: 1,
      initialLikeStatus: false,
      isLiked: false,
      message: "Hi.",
      allRecords: [],
    };
  },

  computed: {
    noRecords() {
      return this.allRecords.length < 1;
    },

    likeModule() {
      // return this.$store.getters[GET_LIKE]({ pk: this.likePk });
      return this.$store.getters[DEFAULT_LIKE];
    },
  },

  watch: {
    isLiked(value, oldValue) {
      logger.debug("$isLiked", value, oldValue);
    },

    noRecords: {
      handler: "watchHandler",
      deep: false,
      immediate: true,
    },
  },

  beforeCreate() {},

  created() {},

  beforeMount() {
    const docStyle = document.documentElement.style;
    docStyle.setProperty("--min-width", "256px");
  },

  mounted() {
    logger.info("$currentTime", dayjs().format());
  },

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroyed() {},

  methods: {
    allRecordsPush(message, event) {
      logger.debug("$event", event);

      const createdAt = dayjs().format("YYYY-MM-DD");
      const record = { message, createdAt };
      this.allRecords.push(record);
    },

    likeStatusChange(isLiked) {
      this.isLiked = isLiked;

      this.allRecordsPush(isLiked ? "I like it!" : "I don't like it!");
      this.likeModelChange(this.likePk, { lastAddBy: isLiked ? 1 : -1 });
      if (isLiked) this.likeStoreChange(this.likePk);
    },

    async likeStoreChange(pk) {
      // this.$store.commit(UPDATE_LIKE, { pk });
      await this.$store.dispatch(CHANGE_LIKE, { pk });
    },

    async likeModelChange(pk, fields) {
      let state = OPERATION_API_STATE.NOT_STARTED;

      console.time("$serverTiming");
      const startTime = dayjs();

      const apiLikeModel = new ApiLikeModel(pk, fields);
      state = OPERATION_API_STATE.RUNNING;

      await apiLikeModel
        // .fetchList()
        // .fetchDetail()
        // .create()
        // .update()
        .updateOrCreate()
        // .drop()
        .then((data) => {
          state = OPERATION_API_STATE.SUCCEEDED;
          logger.info("$data", data);
        })
        .catch((error) => {
          state = OPERATION_API_STATE.FAILED;
          logger.error("$error", error);
          this.$toast.error(ERROR_STATUS_CODE[error.code] || error.message);
        })
        .finally(() => {
          console.timeLog("$serverTiming", "$state", state);
        });

      const endTime = dayjs();
      const serverTiming = endTime.diff(startTime, "ms", true);
      console.timeLog("$serverTiming", serverTiming);
      console.timeEnd("$serverTiming");
    },

    watchHandler(value, oldValue) {
      logger.debug("$noRecords", value, oldValue);

      this.$nextTick(() => {
        logger.debug("$subtitleDOM", this.$refs.subtitleDOM);
      });
    },

    onResize() {
      console.count("$onResize");
      console.table(window.screen, ["(index)", "Value"]);
      logger.debug("$breakpoint", this.$vuetify.breakpoint);
    },
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

.card {
  width: 60%;
  min-width: var(--min-width, 64px);

  ::v-deep .v-card__subtitle {
    font-weight: bold !important;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<style scoped lang="scss" src="@/styles/utilities.scss"></style>

<style scoped module lang="scss" src="@/styles/utilities.module.scss"></style>
