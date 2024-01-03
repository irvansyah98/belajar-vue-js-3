import axios from 'axios';

export default{
    namespaced: true,
    state(){
      return{
        states: [],
        newState: '',
      }
    },
    mutations: {
        setStates(state, data) {
          state.states = data;
        },
        setNewState(state, newState) {
          state.newState = newState;
        },
    },
    actions: {
        fetchUpdateStates({ commit }, stateId) {
          // Fetch data from the API endpoint
          axios.get(`http://localhost:8000/api/coba/detail/${stateId}`)
            .then(response => {
              commit('setNewState', response.data.data.state);
            })
            .catch(error => {
              console.error('Error fetching states:', error);
            });
        },
        fetchStates({ commit }) {
          // Fetch data from the API endpoint
          axios.get('http://localhost:8000/api/coba/list')
            .then(response => {
              commit('setStates', response.data.data);
            })
            .catch(error => {
              console.error('Error fetching states:', error);
            });
        },
        createNewState({ commit, dispatch }, formData) {
          // Post data to the API endpoint to create a new state
          console.log(formData)
          axios.post('http://localhost:8000/api/coba',formData)
            .then(response => {
              // Refresh the list of states after creating a new one
              dispatch('fetchStates');
              console.log(response)
              // Optionally, reset the form or perform any other actions
              commit('setNewState', '');
            })
            .catch(error => {
              console.error('Error creating state:', error);
            });
        },
        removeNewState({ dispatch }, state_id) {
          // Post data to the API endpoint to create a new state
          axios.post('http://localhost:8000/api/coba/remove', { id: state_id })
            .then(response => {
              // Refresh the list of states after creating a new one
              dispatch('fetchStates');
              console.log(state_id)
              console.log(response)
            })
            .catch(error => {
              console.error('Error creating state:', error);
            });
        },
    },
    getters:{
        states(state){
            return state.states
        },
        newstates(state){
            return state.newState
        },
    }
}