import * as types from './mutation-types'

export const mutations = {
    [types.SET_USER] (state, user)
    {
        state.user = user;
    },
    [types.REMOVE_USER] (state)
    {
        state.user = null;
    },
    [types.ADD_USER_PLAYLIST] (state, playlist) {
        state.user.playlists.push(playlist);
    },
    [types.ADD_MUSIC_PLAYLIST] (state, index) {
        state.user.playlists[index].up_total_songs++;
    },

    // GENRES
    [types.SET_GENRES] (state, genres)
    {
        state.genres = genres;
    }
};
