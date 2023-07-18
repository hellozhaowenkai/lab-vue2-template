import {
  DEFAULT_LIKE,
  GET_LIKE_BY_PK,
  INCREMENT_LIKE_BY_PK_MUTATION,
  INCREMENT_LIKE_BY_PK_ACTION,
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
    [DEFAULT_LIKE]: (state, getters, rootState) => getters[GET_LIKE_BY_PK](1),
    [GET_LIKE_BY_PK]: (state, getters, rootState) => (pk) =>
      state.allLikes.find((item) => item.pk === pk),
  },

  mutations: {
    [INCREMENT_LIKE_BY_PK_MUTATION](state, { pk }) {
      const like = state.allLikes.find((todo) => todo.pk === pk);
      if (like) like.totalCount += 1;
    },
  },

  actions: {
    async [INCREMENT_LIKE_BY_PK_ACTION](
      { state, dispatch, commit, rootState },
      { pk }
    ) {
      await Promise.resolve().then(() =>
        commit(INCREMENT_LIKE_BY_PK_MUTATION, { pk })
      );
    },
  },

  modules: {},
};
