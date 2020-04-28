import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { UVIDState } from './types';
import {
  SAVE_ROOMID,
  SAVE_USERNAME,
  SaveRoomIdActionType,
  SaveUsernameActionType,
  requestConnectionActionType,
  REQUEST_CONNECTION,
} from './actions';

const uvidState: UVIDState = {
  roomId: '',
  username: '',
  connectionRequest: '',
};

function uvidReducer(
  state = uvidState,
  action: SaveRoomIdActionType | SaveUsernameActionType | requestConnectionActionType,
): UVIDState {
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
    default:
      return state;
  }
}

const rootReducer = combineReducers({ uvidReducer });
export default rootReducer;
export type UvidState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<UvidState> = useSelector;

