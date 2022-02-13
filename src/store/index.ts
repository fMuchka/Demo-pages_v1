import Vue from 'vue'
import Vuex from 'vuex'

import { MUTATIONS } from "./mutations.type"
import { ACTIONS } from "./actions.type"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    apiReportFetched: false,

    apiReportData: null,

    apiGroupedData: {

    }
  },
  mutations: {
    [MUTATIONS.UPDATE_API_REPORT_DATA](state, data) {
      state.apiReportData = data;
    },
    [MUTATIONS.UPDATE_API_REPORT_FETCH_STATUS](state, newStatus) {
      state.apiReportFetched = newStatus;
    },

    [MUTATIONS.UPDATE_GROUPED_API_DATA](state, data) {
      state.apiGroupedData = data
    }
  },
  actions: {
    [ACTIONS.STORE_API_REPORT_DATA]({ commit, dispatch }, data) {
      commit(MUTATIONS.UPDATE_API_REPORT_DATA, data);
      commit(MUTATIONS.UPDATE_API_REPORT_FETCH_STATUS, true);
         
      dispatch(ACTIONS.STORE_FILTERED_API_DATA, data);
    },


    [ACTIONS.STORE_FILTERED_API_DATA]({ commit }, data: []) {

      function groupBy(list : [], keyGetter: any) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
      }
      
      const groupedData = {
        producers: groupBy(data, (item: { producer: any }) => item.producer),
        directors: groupBy(data, (item: { director: any }) => item.director)
      }

      commit(MUTATIONS.UPDATE_GROUPED_API_DATA, groupedData)
    },
  },
  modules: {
  },
  getters: {
    apiReportFetched: (state) => { return state.apiReportFetched },
    apiReportData: (state) => { return state.apiReportData },
    apiReportGroupedData: (state) => { return state.apiGroupedData }
  }
})
