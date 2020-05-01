import { mutationsTypes } from './mutations';

const actions = {
  createUser({ commit}, username) {
    commit(mutationsTypes.CREATE_USER, username);
  },
}

export default actions