import * as types from './mutation-types'

export const mutations = {
    [types.SET_USER] (state, user)
    {
        state.user = user;
    },
    [types.REMOVE_USER] (state)
    {
        state.user = {};
    },

    // GENRES
    [types.SET_GENRES] (state, genres)
    {
        state.genres = genres;
    }
};
