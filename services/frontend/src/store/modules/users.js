import axios from 'axios';

const state = {
  user: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  stateUser: (state) => state.user,
};

const actions = {
  async register({ dispatch }, form) {
    try {
      const response = await axios.post('register', form);
      const data = response.data;

      if (response.status === 200) {
        let UserForm = new FormData();
        UserForm.append('username', form.username);
        UserForm.append('password', form.password);
        await dispatch('logIn', UserForm);

        return { success: true, data };
      }
      throw response;
    } catch (error) {
      return error;
    }
  },
  async logIn({ dispatch }, user) {
    try {
      const response = await axios.post('login', user);
      const data = response.data;
      if (response.status === 200) {
        await dispatch('viewMe');
        return { success: true, data };
      }
      throw response;
    } catch (error) {
      return error;
    }
  },
  async viewMe({ commit }) {
    let { data } = await axios.get('users/whoami');
    await commit('setUser', data);
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteUser({}, id) {
    await axios.delete(`user/${id}`);
  },
  async logOut({ commit }) {
    let user = null;
    commit('logout', user);
  },
};

const mutations = {
  setUser(state, username) {
    state.user = username;
  },
  logout(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
