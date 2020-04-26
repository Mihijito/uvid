import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import openSocket from 'socket.io-client';

const socket = openSocket.connect('http://localhost:8080');
socket.emit('connection');

const ConferenceRoom: React.FC = () => {
  const { username, roomId } = useParams();
  const shareLinkPresenter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(username);
    if (username && roomId) socket.emit('connect-to-room', JSON.stringify({ username, roomId }));
  }, [username, roomId]);

  useEffect(() => {
    if (roomId && shareLinkPresenter.current) shareLinkPresenter.current.classList.remove('hidden');
  }, [roomId]);

  useEffect(() => () => {
    if (username && roomId) {
      console.log(username);
      console.log('lmao');
      console.log(roomId);
      socket.emit('disconnect', JSON.stringify({ username, roomId }));
    }
  }, [username, roomId]);

  return (
    <div className="mt-12 mb-12 flex flex-col items-center">
      <div>
        {`${username}'s room`}
      </div>
      <div
        ref={shareLinkPresenter}
        className="hidden">
        {`Room link: ${`http://localhost:8080/${roomId}`}`}
      </div>
      <div>
        Peeps talkin and stuff
    </div>
    </div>
  )
};

export default ConferenceRoom;
