import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    popularMovies: [],
    deadpoolMovies:[],
    narutoMoviesSeries:[],
    searchResult:[],
    isSearching: false,
  },
  mutations: {
    SET_POPULAR_MOVIES(state, payload){
      state.popularMovies = payload;
    },
    SET_DEADPOOL_MOVIES(state, payload){
      state.deadpoolMovies = payload;
    },
    SET_NARUTO_MOVIES_SERIES(state,payload){
      state.narutoMoviesSeries = payload;
    },
    SET_SEARCH_RESULT(state,payload){
      state.searchResult = payload;
    },
    SET_IS_SEARCHING(state,payload){
      state.isSearching = payload;
    }
  },
  actions: {
    getPopularMovies({commit}, payload){
      return new Promise((resolve,reject)=>{
        axios.get('https://www.omdbapi.com/?s=movie&apikey=97b8cf46&y=2024')
        .then(response => {
          commit('SET_POPULAR_MOVIES',response.data)
          resolve(response)
        })
        .catch(error => {
         reject(error)
        })
      })
    },
    getDeadpoolMovies({commit},payload){
      return new Promise((resolve,reject)=>{
        axios.get('https://www.omdbapi.com/?type=movie&apikey=97b8cf46&s=Deadpool')
        .then(response =>{
          commit('SET_DEADPOOL_MOVIES',response.data)
          resolve(response)
        })
        .catch(error =>{
          reject(error)
        })
      })
    },
    getNarutoMoviesSeries({commit},payload){
      return new Promise((resolve,reject)=>{
        axios.get('https://www.omdbapi.com/?apikey=97b8cf46&s=Naruto')
        .then(response =>{
          commit('SET_NARUTO_MOVIES_SERIES',response.data)
          resolve(response)
        })
        .catch(error =>{
          reject(error)
        })
      })
    },
    getSearchResult({commit},query){
      commit('SET_IS_SEARCHING', true)
      return new Promise((resolve,reject)=>{
        axios.get(`https://www.omdbapi.com/?apikey=97b8cf46&s=${query}`)
        .then(response =>{
          commit('SET_SEARCH_RESULT',response.data)
          resolve(response)
        })
        .catch(error =>{
          reject(error)
        })
      })
    },
    clearSearch({ commit }) {
      commit('SET_IS_SEARCHING', false);
      commit('SET_SEARCH_RESULT', []);
    },
    getMovieDetails(context, imdbID) {
      return new Promise((resolve, reject) => {
        axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=97b8cf46`)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          })
      });
    }
  },
  modules: {
  }
})
