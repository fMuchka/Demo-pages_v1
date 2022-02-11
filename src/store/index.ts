import Vue from 'vue'
import Vuex from 'vuex'

import { MUTATIONS } from "./mutations.type"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    apiReportFetched: false,

    apiReportData: null
  },
  mutations: {
    [MUTATIONS.STORE_API_REPORT_DATA](state, data) {
      state.apiReportData = data;
      state.apiReportFetched = true;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    apiReportFetched: (state) => { return state.apiReportFetched },
    apiReportData: (state) => { return state.apiReportData }
  }
})
