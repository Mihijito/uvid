import { mutationsTypes } from './mutations';

const actions = {
  createUser({ commit}, username) {
    commit(mutationsTypes.CREATE_USER, username);
  },
  socket_initUserList({state, commit}, payload) {
    payload.forEach(username => {
      if (!(username in state.userList)){
        console.log(username);
        commit(mutationsTypes.CREATE_USER, username);
      }
    });
  },
  async socket_userJoined({state, commit}, username) {
    if (!(username in state.userList)){
      console.log(username);
      const connection = new RTCPeerConnection();
      const offer = await connection.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true })
      console.log(`Call request sent to ${username}`)
      connection.setLocalDescription(offer);
      console.log(username);
      console.log(connection);
      commit(mutationsTypes.ADD_USER, { username, connection });
      this._vm.$socket.client.emit('call-request', JSON.stringify({ callee: username, offer }));
    }
  },
  async socket_callOffer({state}, offerInfo) {
    const { callerUsername, offer } = JSON.parse(offerInfo);
    console.log(callerUsername);
    console.log(offer);
    if (callerUsername in state.userList) {
      console.log(state.userList[callerUsername]);
      state.userList[callerUsername].setRemoteDescription(offer);
      const connection = state.userList[callerUsername];
      const answer = connection.createAnswer();
      state.userList[callerUsername].setLocalDescription(answer);
      this._vm.$socket.client.emit('call-response', JSON.stringify({ callerUsername, answer }));
    }
  },
}

export default actions