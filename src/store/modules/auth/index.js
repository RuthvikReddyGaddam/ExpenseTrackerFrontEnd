import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
    state() {
        return {
          user: {},
          token: "",
          isLoggedIn: false,
          autoLogout: false
        };
    },
    actions,
    getters,
    mutations
};
