import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import generateId from '../roomIdGenerator/idGenerator';
import { useDispatch } from 'react-redux';
import { saveUsername, requestConnection } from '../../store/actions';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [newRoomId, setNewRoomId] = useState('');
  const joinButton = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const newRoomId = generateId();
    setNewRoomId(newRoomId.getValue());
    if (username) dispatch(saveUsername(username));
  }, [username, dispatch]);

  const requestRoomCreation = () => {
    dispatch(requestConnection('create'));
  };

  const permitRoomJoin = () => {
    if (username) {
      history.push('/join');
    }
  };

  return (
    <div className="mt-12 mb-12 flex flex-col items-center">
      <div>
        Welcome to UVID
    </div>
      <div>
        <input
          className="text-black text-center"
          type="text"
          placeholder="Please enter your name"
          onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <Link to={`/${newRoomId}`}>
          <button
            onClick={() => requestRoomCreation()}>
            Create a room
          </button>
        </Link>
      </div>
      <div
        ref={joinButton}>
        <button
          onClick={() => permitRoomJoin()}>
          Join a room
        </button>
      </div>
    </div>
  )
};

export default Home;
