
const createPeerConnexion = (): RTCPeerConnection | undefined => {
  return new RTCPeerConnection();
};

const createOffer = (peerConnexion: RTCPeerConnection): Promise<RTCSessionDescriptionInit> => {
  console.log(peerConnexion);
  return peerConnexion.createOffer({ offerToReceiveVideo: true })
};

const makeRtcConnexion = (): RTCPeerConnection => {
  const peerConnexion = createPeerConnexion();
  if (peerConnexion === undefined) console.log('Peer connexion creation failed');
  return peerConnexion!;
};


export { makeRtcConnexion, createOffer }
