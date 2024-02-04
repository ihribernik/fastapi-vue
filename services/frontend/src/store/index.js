import { createStore } from 'vuex';

import users from './modules/users';
import results from './modules/results';

export default createStore({
  modules: {
    users,
    results,
  },
});
