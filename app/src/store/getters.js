const getters = {
  getClientOwner: (state) => state.clientOwner,
  getUsernamesList: (state) => state.userList,
  getUserConnection: (state) => (username) => state.userList[username],
}

export default getters;