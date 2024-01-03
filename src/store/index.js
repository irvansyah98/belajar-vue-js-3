import { createStore } from "vuex";
import axios from 'axios';

import itemModule from "./modules/item";

const store = createStore({
    modules: {
        item: itemModule
    },
    state(){
        return{
            access_token: null,
            isLoggedIn: false,
        }
    },
    mutations: {
        setLoggedIn(state, isLoggedIn) {
          state.isLoggedIn = isLoggedIn;
        },
        setAccessToken(state, token) {
            state.access_token = token;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.access_token = null;
            state.isLoggedIn = false;
        },
        checkSession(state) {
            // Check session storage for access_token during initialization
            const access_token = sessionStorage.getItem('access_token');
            if (access_token) {
              state.access_token = access_token;
              state.isLoggedIn = true;
            }
        },
    },
    actions:{
        login({ commit }, credentials) {
            // Make a POST request to the login API with credentials
            return axios.post('http://localhost:8000/api/login', credentials)
              .then(response => {
                // Assume the API returns an access_token upon successful login
                const access_token = response.data.access_token;
        
                commit('setAccessToken', access_token);
                // Save access_token to session storage
                sessionStorage.setItem('access_token', access_token);
        
                return access_token;
              })
              .catch(error => {
                // Handle login failure
                console.error('Login failed:', error);
                throw error; // Propagate the error to the caller
              });
        },
        logout({ commit }) {
            // Clear access_token from session storage
            sessionStorage.removeItem('access_token');
            commit('logout');
          },
    }
});

// store.commit('checkSession');

export default store;