import Vue from 'vue'
import Vuex from 'vuex'


import { MUTATIONS } from "./mutations.type"
import { ACTIONS } from "./actions.type"
import { PersonScore } from '@/interfaces/PersonScore';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    apiReportFetched: false,

    apiReportData: null,

    apiGroupedData: {
      directors: new Map<string, []>(),
      producers: new Map<string, []>()
    },

    apiScoreMap: {
      directors: [],
      producers: []
    },

    avgInTime: new Map()
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
    },

    [MUTATIONS.UPDATE_API_AVG_IN_TIME](state, data) {
      state.avgInTime = data;
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
      
      dispatch(ACTIONS.STORE_SCORE_IN_TIME);
        
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

    [ACTIONS.CALCULATE_AVG_SCORE_BY_DIRECTOR]( {commit} ) {
      const directors : Map<string, []> = this.state.apiGroupedData.directors;

      const scoreArr : PersonScore[] = [];

      directors.forEach((value, key) => {
        const scoreSum = value.reduce(function (previousValue: number, currentValue: any) {     
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
      const producers : Map<string, []> = this.state.apiGroupedData.producers;

      const scoreArr : PersonScore[] = [];

      producers.forEach((value, key) => {
        const scoreSum = value.reduce(function (previousValue: number, currentValue: any) {       
              return previousValue + parseInt(currentValue.rt_score)
            }, 0
        );

        const moviesN = value.length;
        const scoreAvg = scoreSum / moviesN;
        
        const score = { person: key, avgScore: scoreAvg, sampleSize: moviesN };

        scoreArr.push(score);
      });
      
      commit(MUTATIONS.UPDATE_API_SCORE_MAP_PRODUCERS, scoreArr)
    },

    [ACTIONS.STORE_SCORE_IN_TIME]({ commit }) {
      const movies = this.state.apiReportData;
      const scoreInTime = new Map(); 

      for (let i = 0; i < movies.length; i++) {
        const m = movies[i];
        
        if (scoreInTime.has(m.release_date)) {
          scoreInTime.get(m.release_date).scores.push(parseInt(m.rt_score)); 
        }
        else {
          scoreInTime.set(m.release_date, {scores: [parseInt(m.rt_score)], avg: 0})
        }
      }

      scoreInTime.forEach(e => {
        // check n of movies in each year
        if (e.scores.length > 1) {
          e.avg = e.scores.reduce(function (previousValue: number, currentValue: any) {
            return previousValue + currentValue
          }, 0) / e.scores.length
        }
        else {
          e.avg = e.scores[0]
        }
      })
      
      commit(MUTATIONS.UPDATE_API_AVG_IN_TIME, scoreInTime);
    }
  },
  modules: {
  },
  getters: {
    apiReportFetched: (state) => { return state.apiReportFetched },
    apiReportData: (state) => { return state.apiReportData },
    apiReportGroupedData: (state) => { return state.apiGroupedData },
    apiScoreMap: (state) => { return state.apiScoreMap },
    avgScoreInTime: (state) => { return state.avgInTime }
  }
})
