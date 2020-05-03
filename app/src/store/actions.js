import { mutationsTypes } from './mutations';


/*function addEventListenerToConnection(context, discoverer, peerConnection) {
  peerConnection.addEventListener('icecandidate', event => {
    if (event.candidate) {
      console.log(`${discoverer} found a new iceCandidate`);
      context._vm.$socket.client.emit('newIceCandidateTransferRequest', JSON.stringify({ discoverer, iceCandidate: event.candidate }));
    }
  });
  peerConnection.addEventListener('connectionstatechange', () => {
    if (peerConnection.connectionState === 'connected') {
      console.log(`Connection with ${discoverer} established`);
    }
  });
  peerConnection.addEventListener('track', async (event) => {
    console.log('hey');
    const video = document.getElementById(discoverer);
    if (!video.srcObject) {
      video.srcObject = event.streams[0];
    }
  });
}*/

const actions = {
  setClientOwner({commit}, username) {
    commit(mutationsTypes.SET_CLIENT_OWNER, username);
  },
  setRoomId({commit}, roomId) {
    commit(mutationsTypes.SET_ROOM_ID, roomId);
  },
  async socket_userDisconnected({commit}, username) {
    commit(mutationsTypes.USER_QUIT, username);
  },
  async socket_newIceCandidate({commit}, iceCandidateInfos) {
    const { correspondent, iceCandidate } = JSON.parse(iceCandidateInfos);
    commit(mutationsTypes.SAVE_ICE_CANDIDATE, { correspondent, iceCandidate });
  },
  async addLocalTracks({state}, localStream) {
    localStream.getTracks().forEach((track) => {
      Object.keys(state.userList).forEach(async user => {
        console.log(user)
        if (user !== state.clientOwner) {
          await state.userList[user].addTrack(track);
        }
      })
    })
    localStream.getAudioTracks()[0].enabled = false;
  },
}

export default actions