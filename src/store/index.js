import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import mockData from '@/mocks/getPayments';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
  },

  actions: {
    async load({ commit, state }, params = {}) {
      commit('setState', { isLoading: true });

      try {
        let data;
        const isProduction = process.env.NODE_ENV === 'production';
        const retrievedMoneyData = localStorage.getItem('moneyData');
        const cachedData = retrievedMoneyData ? JSON.parse(retrievedMoneyData) : null;

        if (isProduction && !state.isCached) {
          data = await api.getPayments(params);
        } else if (!state.isCached) {
          data = await mockData(params);
        } else {
          data = cachedData;
        }

        if (Array.isArray(data.data)) {
          commit('setState', { data: data.data });
        }
        if (!state.isCached) {
          localStorage.setItem('moneyData', JSON.stringify({ data }));
          commit('setState', { isCached: true });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },

    async clearCache({ commit, dispatch }, params = {}) {
      localStorage.removeItem('moneyData');
      commit('setState', { isCached: false });

      await dispatch('load');
    },
  },
});
