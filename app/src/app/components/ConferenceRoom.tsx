import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import openSocket from 'socket.io-client';

const socket = openSocket.connect('http://localhost:8080');
socket.emit('connection');

const ConferenceRoom: React.FC = () => {
  const { username } = useParams();
  const [shareLink, setShareLink] = useState<string>('');
  const shareLinkPresenter = useRef<HTMLDivElement>(null);


  useEffect(() => {
    console.log(username);
    if (username) socket.emit('create-room', username);
  }, [username]);

  useEffect(() => {
    socket.on('room-id', (roomId: string) => {
      setShareLink(roomId);
      if (shareLinkPresenter.current) shareLinkPresenter.current.classList.remove('hidden');
    });
    socket.on('like-notification', (commenterUsername: string) => {
      //addToast(`${commenterUsername} liked your post!`, { appearance: 'success', autoDismiss: true });
    });
  }, [username]);

  useEffect(() => () => {
    socket.emit('disconnect', username);
  }, [username]);

  return (
    <div className="mt-12 mb-12 flex flex-col items-center">
      <div>
        {`${username}'s room`}
      </div>
      <div
        ref={shareLinkPresenter}
        className="hidden">
        {`Room link: ${`http://localhost:8080/${shareLink}`}`}
      </div>
      <div>
        Peeps talkin and stuff
    </div>
    </div>
  )
};

export default ConferenceRoom;