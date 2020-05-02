import Vue from 'vue';
export const mutationsTypes = {
  ADD_USER: 'ADD_USER',
  USER_QUIT: 'USER_QUIT',
  SAVE_ICE_CANDIDATE: 'SAVE_ICE_CANDIDATE',
}

const mutations = {
  [mutationsTypes.ADD_USER](state, { username, connection }) {
    console.log(`${username} added`);
    Vue.set(state.userList, username, connection);
  },
  [mutationsTypes.USER_QUIT](state, username) {
    console.log(`${username} quit`);
    Vue.delete(state.userList, username);
  },
  [mutationsTypes.SAVE_ICE_CANDIDATE](state, { correspondent, iceCandidate }) {
    console.log(`${correspondent} saved new IceCandidate`);
    state.userList[correspondent].addIceCandidate(iceCandidate);
  },
};

export default mutations