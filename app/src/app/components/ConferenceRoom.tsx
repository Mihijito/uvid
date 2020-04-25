import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import openSocket from 'socket.io-client';

const socket = openSocket.connect('http://localhost:8080');
socket.emit('connection');

const ConferenceRoom: React.FC = () => {
  const { username } = useParams();

  useEffect(() => () => {
    socket.emit('disconnect', username);
  }, [username]);

  useEffect(() => {
    socket.on('comment-notification', (commenterUsername: string) => {
      //addToast(`${commenterUsername} commented on your post!`, { appearance: 'success', autoDismiss: true });
    });
    socket.on('like-notification', (commenterUsername: string) => {
      //addToast(`${commenterUsername} liked your post!`, { appearance: 'success', autoDismiss: true });
    });
  }, [username]);

  useEffect(() => {
    console.log(username);
    if (username) socket.emit('log-user-in', username);
  }, [username]);

  return (
    <div className="mt-12 mb-12 flex flex-col items-center">
      <div>
        {`${username}'s room`}
      </div>
      <div>
        Peeps talkin and stuff
    </div>
    </div>
  )
};

export default ConferenceRoom;