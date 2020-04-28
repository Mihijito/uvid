import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import generateId from '../roomIdGenerator/idGenerator';
import { useDispatch } from 'react-redux';
import { saveUsername, requestConnection } from '../../store/actions';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [newRoomId, setNewRoomId] = useState('');
  const [existingRoomId, setExistingRoomId] = useState('');
  const joinButton = useRef<HTMLDivElement>(null);
  const joinARoom = useRef<HTMLDivElement>(null);
  const roomIdInput = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const newRoomId = generateId();
    setNewRoomId(newRoomId.getValue());
    if (username) dispatch(saveUsername(username));
  }, [username, dispatch]);

  const requestRoomJoin = () => {
    if (username && existingRoomId) {
      dispatch(requestConnection('join'));
      history.push(`/${existingRoomId}`);
    }
  };

  const requestRoomCreation = () => {
    dispatch(requestConnection('create'));
  };

  const permitRoomJoin = () => {
    if (username) {
      showJoinRoomForm();
    }
  };

  const showJoinRoomForm = () => {
    if (joinButton.current) joinButton.current.classList.remove('hidden');
    if (roomIdInput.current) roomIdInput.current.classList.remove('hidden');
    if (joinARoom.current) joinARoom.current.classList.add('hidden');
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
        ref={joinARoom}>
        <button
          onClick={() => permitRoomJoin()}>
          Join a room
        </button>
      </div>
      <div
        className="hidden"
        ref={roomIdInput}>
        <input
          className="text-black text-center"
          type="text"
          placeholder="Please enter room ID"
          onChange={(e) => setExistingRoomId(e.target.value)} />
      </div>
      <div
        ref={joinButton}
        className="hidden">
        <button
          onClick={() => requestRoomJoin()}>
          Join room
        </button>
      </div>
    </div>
  )
};

export default Home;
