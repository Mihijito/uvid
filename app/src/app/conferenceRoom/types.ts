class ConnectedUsersCollection {
  private peerConnexionByUsername: { [key: string]: any };

  constructor() {
    this.peerConnexionByUsername = {};
  }

  addUser = (username: string) => {
    if (!(username in this.peerConnexionByUsername)) this.peerConnexionByUsername[username] = {};
  };

  addUsers = (usernames: string[]) => {
    console.log('called once');
    usernames.forEach((username: string) => {
      if (!(username in this.peerConnexionByUsername)) this.peerConnexionByUsername[username] = {};
    });
  };

  removeUser = (username: string) => {
    if (username in this.peerConnexionByUsername) {
      delete this.peerConnexionByUsername[username];
    }
  }

  userConnected = (username: string) => {
    return username in this.peerConnexionByUsername;
  }

  getUsernameList = () => {
    return Object.keys(this.peerConnexionByUsername);
  }
}

export default ConnectedUsersCollection;