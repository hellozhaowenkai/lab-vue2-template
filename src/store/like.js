import {
  DEFAULT_LIKE,
  GET_LIKE,
  UPDATE_LIKE,
  CHANGE_LIKE,
} from "@/store/flux-types";

export default {
  state: () => ({
    allLikes: [
      { pk: 1, totalCount: 0 },
      { pk: 2, totalCount: 0 },
      // ...
    ],
  }),

  getters: {
    [DEFAULT_LIKE]: (state, getters, rootState, rootGetters) =>
      getters[GET_LIKE]({ pk: 1 }),

    [GET_LIKE]:
      (state, getters, rootState, rootGetters) =>
      ({ pk }) =>
        state.allLikes.find((item) => item.pk === pk),
  },

  mutations: {
    [UPDATE_LIKE](state, { pk }) {
      const like = state.allLikes.find((item) => item.pk === pk);

      if (like) like.totalCount += 1;
      else throw new Error("NotFound: No target found matching the query.");

      return pk;
    },
  },

  actions: {
    [CHANGE_LIKE](
      { commit, dispatch, state, getters, rootState, rootGetters },
      { pk }
    ) {
      commit(UPDATE_LIKE, { pk });

      return pk;
    },
  },

  modules: {},
};
