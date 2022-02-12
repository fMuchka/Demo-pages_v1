import Vue from 'vue'
import Vuex from 'vuex'

import { MUTATIONS } from "./mutations.type"
import { ACTIONS } from "./actions.type"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    apiReportFetched: false,

    apiReportData: null
  },
  mutations: {
    [MUTATIONS.UPDATE_API_REPORT_DATA](state, data) {
      state.apiReportData = data;
    },
    [MUTATIONS.UPDATE_API_REPORT_FETCH_STATUS](state, newStatus) {
      state.apiReportFetched = newStatus;
    }
  },
  actions: {
    [ACTIONS.STORE_API_REPORT_DATA]({ commit }, data) {
      commit(MUTATIONS.UPDATE_API_REPORT_DATA, data);
      commit(MUTATIONS.UPDATE_API_REPORT_FETCH_STATUS, true);
      
    }
  },
  modules: {
  },
  getters: {
    apiReportFetched: (state) => { return state.apiReportFetched },
    apiReportData: (state) => { return state.apiReportData }
  }
})
