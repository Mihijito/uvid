
const createPeerConnexion = (): RTCPeerConnection | undefined => {
  return new RTCPeerConnection();
};

const createOffer = (peerConnection: RTCPeerConnection): RTCSessionDescriptionInit | undefined => {
  let createdOffer: RTCSessionDescriptionInit;
  peerConnection.createOffer({ offerToReceiveVideo: true })
    .then((offer: RTCSessionDescriptionInit) => {
      console.log(`This fuckign offer ${offer}`)
      createdOffer = offer;
      return createdOffer;
    })
    .catch(() => {
      console.log('Offer creation failed');
    })
  return undefined;
};

const createAnswer = (peerConnection: RTCPeerConnection): RTCSessionDescriptionInit | undefined => {
  let createdAnswer: RTCSessionDescriptionInit;
  peerConnection.createAnswer({ offerToReceiveVideo: true })
    .then((answer: RTCSessionDescriptionInit) => {
      createdAnswer = answer;
      return createdAnswer;
    })
    .catch(() => {
      console.log('Offer creation failed');
    })
  return undefined;
}

const makeRtcConnexion = (): RTCPeerConnection => {
  const peerConnexion = createPeerConnexion();
  if (peerConnexion === undefined) console.log('Peer connexion creation failed');
  return peerConnexion!;
};


export { makeRtcConnexion, createOffer, createAnswer }
