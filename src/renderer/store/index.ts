import account from './modules/account';

// logger debug
import createLogger from 'vuex/dist/logger';
import Vue from 'vue';
import Vuex from 'vuex';

// import vue other modules
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

// assert is production、testing or dev
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    account,
  },
  strict: debug,
  plugins: debug ? [createLogger({})] : [],
});
