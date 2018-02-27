import * as types from './mutation-types'

export const setUser = ({commit}, user) => {
    commit(types.SET_USER, user);
};

export const removeUser = ({commit}) => {
    commit(types.REMOVE_USER);
};


// genre
export const getGenre = ({commit}) => {
    // query here

};
