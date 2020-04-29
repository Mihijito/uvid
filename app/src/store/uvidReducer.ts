import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { UVIDState } from './types';
import {
  SAVE_ROOMID,
  SAVE_USERNAME,
  REQUEST_CONNECTION,
  INIT_USERLIST,
  ADD_USER,
  REMOVE_USER,
  SaveRoomIdActionType,
  SaveUsernameActionType,
  requestConnectionActionType,
  initializeUserListActionType,
  addUserToUserListActionType,
  removeUserFromUserListActionType,
  addLocalDescriptionActionType,
  addRemoteDescriptionActionType,
  ADD_LOCAL_DESCRIPTION,
  ADD_REMOTE_DESCRIPTION,
} from './actions';

const uvidState: UVIDState = {
  roomId: '',
  username: '',
  connectionRequest: '',
  userList: {},
};

function uvidReducer(
  state = uvidState,
  action: SaveRoomIdActionType
    | SaveUsernameActionType
    | requestConnectionActionType
    | initializeUserListActionType
    | addUserToUserListActionType
    | removeUserFromUserListActionType
    | addLocalDescriptionActionType
    | addRemoteDescriptionActionType,
): UVIDState {
  let tempUserList = { ...state.userList };
  switch (action.type) {
    case SAVE_ROOMID:
      return {
        ...state,
        roomId: action.payload.roomId,
      };
    case SAVE_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      };
    case REQUEST_CONNECTION:
      return {
        ...state,
        connectionRequest: action.payload.type,
      };
    case INIT_USERLIST:
      const newUsers: { [key: string]: any } = {};
      action.payload.userList.forEach((username: string) => {
        if (!(username in state.userList)) newUsers[username] = new RTCPeerConnection();
      });
      return {
        ...state,
        userList: { ...state.userList, ...newUsers },
      };
    case ADD_USER:
      const newUser: { [key: string]: RTCPeerConnection } = {};
      if (!(action.payload.user in state.userList)) newUser[action.payload.user] = action.payload.peerConnection;
      return {
        ...state,
        userList: { ...state.userList, ...newUser },
      };
    case REMOVE_USER:
      if (action.payload.username in tempUserList) delete tempUserList[action.payload.username];
      return {
        ...state,
        userList: { ...tempUserList },
      };
    case ADD_LOCAL_DESCRIPTION:
      console.log(tempUserList)
      console.log(action.payload.username);
      if (action.payload.username in tempUserList) tempUserList[action.payload.username].setLocalDescription(action.payload.description);
      return {
        ...state,
        userList: { ...tempUserList }
      }
    case ADD_REMOTE_DESCRIPTION:
      return {
        ...state,
        userList: { ...tempUserList }
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({ uvidReducer });
export default rootReducer;
export type UvidState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<UvidState> = useSelector;

