import STORE_CONST from '../consts';
import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface State {
  user: object;
}

const state: State = {
  user: {},
};

const mutations: MutationTree<any> = {
  [STORE_CONST.ACCOUNT.LOGIN](state, user): void {
    state.user = user;
  },
};

const actions: ActionTree<any, any> = {
  /**
   * 登录
   * @param commit
   * @param data 用户参数
   */
  login({ commit }, data) {
    commit(STORE_CONST.ACCOUNT.LOGIN, {name:'xxx'});
  },
};

const getters: GetterTree<any, any> = {
  user: state => {
    return state.user;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
