import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestConnection, saveUsername } from '../../store/actions';
import InputForm from '../components/InputForm';

const JoinLink: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { roomId } = useParams();

  const requestRoomJoin = (username: string) => {
    if (username && roomId) {
      dispatch(requestConnection('join'));
      dispatch(saveUsername(username))
      history.push(`/${roomId}`);
    }
  };

  return (
    <div>
      <InputForm inputPlaceHolder={'Please enter your username'} onInputEntry={requestRoomJoin} />
    </div>
  );
};

export default JoinLink;
