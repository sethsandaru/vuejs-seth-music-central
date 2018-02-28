import * as types from './mutation-types'
import {url} from "../helper";
import axios from 'axios'

export const setUser = ({commit}, user) => {
    commit(types.SET_USER, user);
};

export const removeUser = ({commit}) => {
    commit(types.REMOVE_USER);
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
