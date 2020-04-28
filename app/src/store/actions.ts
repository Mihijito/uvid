export const SAVE_ROOMID = 'SAVE_ROOMID';
export const SAVE_USERNAME = 'SAVE_USERNAME';
export const REQUEST_CONNECTION = 'REQUEST_CONNECTION';

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
