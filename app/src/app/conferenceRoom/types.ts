class ConnectedUsersCollection {
  private peerConnexionByUsername: { [key: string]: RTCPeerConnection };

  constructor() {
    this.peerConnexionByUsername = {};
  }

  addUser = (username: string, peerConnection: RTCPeerConnection) => {
    if (!(username in this.peerConnexionByUsername)) this.peerConnexionByUsername[username] = peerConnection;
  };

  addUsers = (usernames: string[]) => {
    usernames.forEach((username: string) => {
      if (!(username in this.peerConnexionByUsername)) this.peerConnexionByUsername[username] = new RTCPeerConnection();
    });
  };

  addLocalDescription = (username: string, peerConnection: RTCSessionDescriptionInit) => {
    if (username in this.peerConnexionByUsername) this.peerConnexionByUsername[username].setLocalDescription(peerConnection);
  }

  addRemoteDescription = (username: string, peerConnection: RTCSessionDescriptionInit) => {
    console.log(peerConnection);
    if (username in this.peerConnexionByUsername) this.peerConnexionByUsername[username].setRemoteDescription(peerConnection);
  }

  removeUser = (username: string) => {
    if (username in this.peerConnexionByUsername) {
      delete this.peerConnexionByUsername[username];
    }
  }

  userConnected = (username: string) => {
    return username in this.peerConnexionByUsername;
  }

  get = (username: string): RTCPeerConnection | undefined => {
    return username in this.peerConnexionByUsername ? this.peerConnexionByUsername[username] : undefined;
  }

  getUsernameList = () => {
    return Object.keys(this.peerConnexionByUsername);
  }
}

export default ConnectedUsersCollection;