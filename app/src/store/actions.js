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
      const connection = new RTCPeerConnection();
      const offer = await connection.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true })
      console.log(`Call request sent to ${username}`)
      await connection.setLocalDescription(offer);
      console.log(`${username} saved local description`)
      commit(mutationsTypes.ADD_USER, { username, connection });
      this._vm.$socket.client.emit('call-request', JSON.stringify({ callee: username, offer }));
    }
  },
  async socket_callOffer({state}, offerInfo) {
    const { callerUsername, offer } = JSON.parse(offerInfo);
    if (callerUsername in state.userList) {
      await state.userList[callerUsername].setRemoteDescription(offer);
      const connection = state.userList[callerUsername];
      const answer = await connection.createAnswer();
      console.log(answer);
      await state.userList[callerUsername].setLocalDescription(answer);
      console.log(`${callerUsername} saved local and remote description`)
      this._vm.$socket.client.emit('call-response', JSON.stringify({ callerUsername, answer }));
    }
  },
  async socket_callAnswer({state}, answerInfo) {
    const { calleeUsername, answer } = JSON.parse(answerInfo);
    console.log(calleeUsername);
    console.log(answer);
    if (calleeUsername in state.userList) {
      await state.userList[calleeUsername].setRemoteDescription(answer);
      console.log(`${calleeUsername} saved remote description`)
    }
  }
}

export default actions