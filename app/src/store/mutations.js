export const mutationsTypes = {
  ADD_USER: 'ADD_USER',
}

const mutations = {
  [mutationsTypes.ADD_USER](state, user) {
    state.userList[user] = new RTCPeerConnection();
  },
};

export default mutations