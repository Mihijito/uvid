import { mutationsTypes } from './mutations';

const actions = {
  createUser({ commit}, username) {
    commit(mutationsTypes.CREATE_USER, username);
  },
  socket_initUserList({state, commit}, payload) {
    payload.forEach(username => {
      if (!(username in state.userList)){
        console.log(username);
        commit(mutationsTypes.ADD_USER, username);
      }
    });
  },
  socket_userJoined({state, commit}, username) {
    if (!(username in state.userList)){
      console.log(username);
      commit(mutationsTypes.ADD_USER, username);
    }
  }
}

export default actions