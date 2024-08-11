import axios from 'axios';

const state = {
  results: null,
  result: null,
};

const getters = {
  stateResults: (state) => state.results,
  stateResult: (state) => state.result,
};

const actions = {
  async createResult({ dispatch }, result) {
    try {
      const response = await axios.post('results', result);
      const data = response.data;
      if (response.status === 200) {
        await dispatch('getResults');
        return { success: true, data };
      }
      throw response;
    } catch (error) {
      return error;
    }
  },
  async getResults({ commit }) {
    let { data } = await axios.get('results');
    await commit('setResults', data);
  },
  async viewResult({ commit }, id) {
    let { data } = await axios.get(`result/${id}`);
    await commit('setResult', data);
  },
  // eslint-disable-next-line no-empty-pattern
  async updateResult({}, result) {
    await axios.patch(`result/${result.id}`, result.form);
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteResult({}, id) {
    await axios.delete(`result/${id}`);
  },
};

const mutations = {
  setResults(state, results) {
    state.results = results;
  },
  setResult(state, result) {
    state.result = result;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
