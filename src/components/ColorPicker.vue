<template>
  <v-container class="d-flex justify-center align-center">
    <v-card outlined tile>
      <v-color-picker
        show-swatches
        v-model="pickedColor"
        :swatches="distinctColors"
      ></v-color-picker>
    </v-card>
  </v-container>
</template>

<script>
import { palette } from "@/helpers/colors-generator";

export default {
  name: "ColorPicker",

  data() {
    const distinctColors = palette(20)
      .map((item) => item.hex)
      .reduce((previousValue, currentValue, currentIndex) => {
        let result = null;
        if (currentIndex % 4 === 0) {
          result = [...previousValue, [currentValue]];
        } else {
          previousValue[previousValue.length - 1].push(currentValue);
          result = previousValue;
        }
        return result;
      }, []);

    return {
      distinctColors,
      pickedColor: null,
    };
  },

  watch: {
    pickedColor(value, oldValue) {
      console.log("watch", "pickedColor", value, oldValue);
    },
  },
};
</script>
