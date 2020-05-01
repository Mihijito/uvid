import { mutationsTypes } from './mutations';

const actions = {
  addNewUser({ state, commit}, user) {
    if (!(user in state.userList)) commit(mutationsTypes.ADD_USER, user);
  }
}

export default actions