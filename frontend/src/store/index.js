import { createStore } from 'vuex';

const store = createStore({
  state: {
    authToken: localStorage.getItem('authToken') || '',
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
      localStorage.setItem('authToken', token); 
    },
    clearAuthToken(state) {
      state.authToken = '';
      localStorage.removeItem('authToken'); 
    },
  },
});

export default store;
