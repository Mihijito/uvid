export const mutationsTypes = {
  CREATE_USER: 'CREATE_USER',
}

const mutations = {
  [mutationsTypes.CREATE_USER](state, username) {
    state.roomOwner = username;
    state.userList[username] = new RTCPeerConnection();
  },
};

export default mutations