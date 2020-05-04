import Vue from 'vue';
export const mutationsTypes = {
  SET_CLIENT_OWNER: 'SET_CLIENT_OWNER',
  ADD_USER: 'ADD_USER',
  USER_QUIT: 'USER_QUIT',
  SAVE_ICE_CANDIDATE: 'SAVE_ICE_CANDIDATE',
  SET_ROOM_ID: 'SET_ROOM_ID',
}

const mutations = {
  [mutationsTypes.SET_CLIENT_OWNER](state, username) {
    state.clientOwner = username;
  },
  [mutationsTypes.SET_ROOM_ID](state, roomId) {
    state.roomId = roomId;
  },
  [mutationsTypes.ADD_USER](state, { username, connection }) {
    console.log(`${username} joined`);
    Vue.set(state.userList, username, connection);
  },
  [mutationsTypes.USER_QUIT](state, username) {
    console.log(`${username} quit`);
    Vue.delete(state.userList, username);
  },
  async [mutationsTypes.SAVE_ICE_CANDIDATE](state, { correspondent, iceCandidate }) {
    console.log(`${correspondent} saved new IceCandidate`);
    console.log(iceCandidate);
    state.userList[correspondent].addIceCandidate(iceCandidate)
    .catch((error) => {
      console.log(iceCandidate);
      console.log(error);
    });
  },
};

export default mutations