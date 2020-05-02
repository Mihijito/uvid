import { mutationsTypes } from './mutations';


const configuration = {'iceServers': [
  {'urls': 'stun:stun.l.google.com:19302'},
  {'urls': 'stun:stun1.l.google.com:19302'}
]}

function addEventListenerToConnection(context, discoverer, peerConnection) {
  peerConnection.addEventListener('icecandidate', event => {
    if (event.candidate) {
      console.log(`${discoverer} found a new iceCandidate`);
      context._vm.$socket.client.emit('newIceCandidateTransferRequest', JSON.stringify({ discoverer, iceCandidate: event.candidate }));
    }
  });
  return peerConnection;
}

const actions = {
  socket_initUserList({state, commit}, payload) {
    payload.forEach(username => {
      if (!(username in state.userList)) {
        console.log(username);
        const connection = new RTCPeerConnection(configuration);
        addEventListenerToConnection(this, username, connection)
        commit(mutationsTypes.ADD_USER, { username, connection });
      }
    });
  },
  async socket_userJoined({state, commit}, username) {
    if (!(username in state.userList)){
      const connection = new RTCPeerConnection(configuration);
      addEventListenerToConnection(this, username, connection)
      const offer = await connection.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true });
      await connection.setLocalDescription(offer);
      console.log(`${username} saved local description`);

      commit(mutationsTypes.ADD_USER, { username, connection });

      this._vm.$socket.client.emit('call-request', JSON.stringify({ callee: username, offer }));
      console.log(`Call request sent to ${username}`)
    }
  },
  async socket_callOffer({state}, offerInfo) {
    const { callerUsername, offer } = JSON.parse(offerInfo);
    if (callerUsername in state.userList) {
      await state.userList[callerUsername].setRemoteDescription(offer);

      const connection = state.userList[callerUsername];
      const answer = await connection.createAnswer();
      await state.userList[callerUsername].setLocalDescription(answer);

      console.log(`${callerUsername} saved local and remote description`)
      this._vm.$socket.client.emit('call-response', JSON.stringify({ callerUsername, answer }));
    }
  },
  async socket_callAnswer({state}, answerInfo) {
    const { calleeUsername, answer } = JSON.parse(answerInfo);
    if (calleeUsername in state.userList) {
      await state.userList[calleeUsername].setRemoteDescription(answer);
      console.log(`${calleeUsername} saved remote description`)
    }
  },
  async socket_userDisconnected({commit}, username) {
    commit(mutationsTypes.USER_QUIT, username);
  },
  async socket_newIceCandidate({commit}, iceCandidateInfos) {
    const { correspondent, iceCandidate } = JSON.parse(iceCandidateInfos);
    commit(mutationsTypes.SAVE_ICE_CANDIDATE, { correspondent, iceCandidate });
  },
}

export default actions