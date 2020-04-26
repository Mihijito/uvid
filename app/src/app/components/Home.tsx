import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import generateId from '../conferenceRoom/idGenerator';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('')

  useEffect(() => {
    const newRoomId = generateId();
    setRoomId(newRoomId.getValue());
  }, [username]);

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
        <Link to={`/conferenceRoom/${username}/${roomId}`}>
          <button>
            Create a room
          </button>
        </Link>
      </div>
    </div>
  )
};

export default Home;
