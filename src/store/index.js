import Vue from 'vue'
import Vuex from 'vuex'


import MUTATIONS from "./mutations.type"
import ACTIONS from "./actions.type"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    apiReportFetched: false,

    apiReportData: null,

    apiGroupedData: {
      directors: new Map(),
      producers: new Map()
    },

    apiScoreMap: {
      directors: [],
      producers: []
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
    },

    [MUTATIONS.UPDATE_API_SCORE_MAP_DIRECTORS](state, data) {
      state.apiScoreMap.directors = data;
    },

    [MUTATIONS.UPDATE_API_SCORE_MAP_PRODUCERS](state, data) {
      state.apiScoreMap.producers = data;
    }
  },
  actions: {
    [ACTIONS.STORE_API_REPORT_DATA]({ commit, dispatch }, data) {
      commit(MUTATIONS.UPDATE_API_REPORT_DATA, data);
      commit(MUTATIONS.UPDATE_API_REPORT_FETCH_STATUS, true);
         
      dispatch(ACTIONS.STORE_FILTERED_API_DATA, data)
        .then(() => {
          dispatch(ACTIONS.CALCULATE_AVG_SCORE_BY_DIRECTOR);
          dispatch(ACTIONS.CALCULATE_AVG_SCORE_BY_PRODUCER); 
        })
        
    },


    [ACTIONS.STORE_FILTERED_API_DATA]({ commit }, data) {

      function groupBy(list, keyGetter) {
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
        producers: groupBy(data, item => item.producer),
        directors: groupBy(data, item => item.director)
      }

      commit(MUTATIONS.UPDATE_GROUPED_API_DATA, groupedData)
    },

    [ACTIONS.CALCULATE_AVG_SCORE_BY_DIRECTOR]( {commit} ) {
      const directors  = this.state.apiGroupedData.directors;

      const scoreArr = [];

      directors.forEach((value, key) => {
        const scoreSum = value.reduce(function (previousValue, currentValue) {     
              return previousValue + parseInt(currentValue.rt_score)
            }, 0
        );

        const moviesN = value.length;
        const scoreAvg = scoreSum / moviesN;

        const score = { person: key, avgScore: scoreAvg, sampleSize: moviesN };

        scoreArr.push(score);
      });

      commit(MUTATIONS.UPDATE_API_SCORE_MAP_DIRECTORS, scoreArr)
    },

    [ACTIONS.CALCULATE_AVG_SCORE_BY_PRODUCER]( {commit} ) {
      const producers = this.state.apiGroupedData.producers;

      const scoreArr = [];

      producers.forEach((value, key) => {
        const scoreSum = value.reduce(function (previousValue, currentValue) {       
              return previousValue + parseInt(currentValue.rt_score)
            }, 0
        );

        const moviesN = value.length;
        const scoreAvg = scoreSum / moviesN;
        
        const score = { person: key, avgScore: scoreAvg, sampleSize: moviesN };

        scoreArr.push(score);
      });
      

      commit(MUTATIONS.UPDATE_API_SCORE_MAP_PRODUCERS, scoreArr)
    }
  },
  modules: {
  },
  getters: {
    apiReportFetched: (state) => { return state.apiReportFetched },
    apiReportData: (state) => { return state.apiReportData },
    apiReportGroupedData: (state) => { return state.apiGroupedData },
    apiScoreMap: (state) => { return state.apiScoreMap }
  }
})
