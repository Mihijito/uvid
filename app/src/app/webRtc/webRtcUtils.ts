
const createPeerConnexion = (): RTCPeerConnection | undefined => {
  return new RTCPeerConnection();
};

const createOffer = (peerConnexion: RTCPeerConnection): RTCSessionDescriptionInit | undefined => {
  let createdOffer: RTCSessionDescriptionInit;
  peerConnexion.createOffer({ offerToReceiveVideo: true })
    .then((offer: RTCSessionDescriptionInit) => {
      createdOffer = offer!;
    })
  return createdOffer!;
};

const makeRtcConnexion = (): RTCPeerConnection => {
  const peerConnexion = createPeerConnexion();
  if (peerConnexion === undefined) console.log('Peer connexion creation failed');
  return peerConnexion!;
};


export { makeRtcConnexion, createOffer }
