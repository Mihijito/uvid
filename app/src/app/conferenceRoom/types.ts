class ConnectedUsersCollection {
  private connectedUsersArray: Array<string>;

  constructor() {
    this.connectedUsersArray = new Array<string>();
  }

  addUser = (username: string) => {
    if (!this.connectedUsersArray.includes(username)) this.connectedUsersArray.push(username);
  };

  addUsers = (usernames: string[]) => {
    usernames.forEach((username: string) => {
      if (!this.connectedUsersArray.includes(username)) this.connectedUsersArray.push(username);
    });
  };

  removeUser = (username: string) => {
    if (this.connectedUsersArray.includes(username)) {
      const index = this.connectedUsersArray.indexOf(username);
      this.connectedUsersArray.splice(index, 1);
    }
  }

  userConnected = (username: string) => {
    return this.connectedUsersArray.includes(username);
  }
}

export default ConnectedUsersCollection;