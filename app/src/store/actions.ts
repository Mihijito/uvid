export const SAVE_ROOMID = 'SAVE_ROOMID';
export const SAVE_USERNAME = 'SAVE_USERNAME';
export const REQUEST_CONNECTION = 'REQUEST_CONNECTION';
export const INIT_USERLIST = 'INIT_USERLIST';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

export interface SaveRoomIdActionType {
  type: typeof SAVE_ROOMID;
  payload: {
    roomId: string;
  }
}

export interface SaveUsernameActionType {
  type: typeof SAVE_USERNAME;
  payload: {
    username: string;
  }
}

export interface requestConnectionActionType {
  type: typeof REQUEST_CONNECTION;
  payload: {
    type: string;
  }
}

export interface initializeUserListActionType {
  type: typeof INIT_USERLIST;
  payload: {
    userList: string[];
  }
}

export interface addUserToUserListActionType {
  type: typeof ADD_USER;
  payload: {
    user: string;
  }
}

export interface removeUserFromUserListActionType {
  type: typeof REMOVE_USER;
  payload: {
    username: string;
  }
}


export function saveRoomId(roomId: string): SaveRoomIdActionType {
  return {
    type: SAVE_ROOMID,
    payload: {
      roomId,
    },
  };
}

export function saveUsername(username: string): SaveUsernameActionType {
  return {
    type: SAVE_USERNAME,
    payload: {
      username,
    },
  };
}

export function requestConnection(connectionType: string): requestConnectionActionType {
  return {
    type: REQUEST_CONNECTION,
    payload: {
      type: connectionType,
    },
  };
}

export function initializeUserList(userList: string[]): initializeUserListActionType {
  return {
    type: INIT_USERLIST,
    payload: {
      userList,
    },
  };
}

export function addUserToUserList(username: string): addUserToUserListActionType {
  return {
    type: ADD_USER,
    payload: {
      user: username,
    },
  };
}

export function removeUserFromList(username: string): removeUserFromUserListActionType {
  return {
    type: REMOVE_USER,
    payload: {
      username,
    },
  };
}
