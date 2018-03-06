import Vue from 'vue';
import Vuex from 'vuex';
import {mutations} from "./mutations";
import * as actions from './actions';
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'


Vue.use(Vuex);

const state = {
    user: null,
    genres: []
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
                removeItem: key => Cookies.remove(key)
            }
        })
    ],
});
