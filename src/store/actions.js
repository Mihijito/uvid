import { mutationsTypes } from './mutations';

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