import Vue from 'vue';
export const mutationsTypes = {
  CREATE_USER: 'CREATE_USER',
  ADD_USER: 'ADD_USER',
}

const mutations = {
  [mutationsTypes.CREATE_USER](state, username) {
    state.roomOwner = username;
    state.userList[username] = new RTCPeerConnection();
  },
  [mutationsTypes.ADD_USER](state, { username, connection }) {
    console.log(`${username} added`);
    Vue.set(state.userList, username, connection);
  },
};

export default mutations