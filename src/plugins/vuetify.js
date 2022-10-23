import Vue from "vue";
// in order to use treeshaking, you must import Vuetify from vuetify/lib.
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

// See `vuetify/types/services/presets`.
const userPreset = {};

export default new Vuetify(userPreset);
