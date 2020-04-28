
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../store/uvidReducer';
import { useDispatch } from 'react-redux';
import { requestConnection } from '../../store/actions';
import InputForm from '../components/InputForm';

const JoinRoom: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useTypedSelector((state) => state.uvidReducer.username);

  const requestRoomJoin = (roomId: string) => {
    if (username && roomId) {
      dispatch(requestConnection('join'));
      history.push(`/${roomId}`);
    }
  };

  return (
    <div>
      <InputForm inputPlaceHolder={'Please enter the room ID'} onInputEntry={requestRoomJoin} />
    </div>
  );
};

export default JoinRoom;