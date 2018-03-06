import * as types from './mutation-types'
import {url} from "../helper";
import axios from 'axios'

export const setUser = ({commit}, user) => {
    commit(types.SET_USER, user);
};

export const removeUser = ({commit}) => {
    commit(types.REMOVE_USER);
};

export const addUserPlaylist = ({commit}, playlist) => {
    commit(types.ADD_USER_PLAYLIST, playlist);
};

export const addMusicPlaylist = ({commit}, index) => {
    commit(types.ADD_MUSIC_PLAYLIST, index);
};


// genre
export const getGenre = ({commit}) => {
    // query here
    url.setController('Genre');
    axios.get(url.getURL('GetAll'))
      .then(response => {
          commit('SET_GENRES', response.data);
      })
      .catch(err => {
          toastr.error('Failed to get genre!', 'Error');
      });
};
