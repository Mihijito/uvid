import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import openSocket from 'socket.io-client';

const socket = openSocket.connect('http://localhost:8080');
socket.emit('connection');

const ConferenceRoom: React.FC = () => {
  const { username, roomId } = useParams();
  const shareLinkPresenter = useRef<HTMLDivElement>(null);
  const [connectedUsers, updateConnectedUsers] = useState<string[]>([]);

  useEffect(() => {
    console.log(username);
    if (username && roomId) socket.emit('connect-to-room', JSON.stringify({ username, roomId }));

  }, [username, roomId]);

  useEffect(() => {
    socket.on('update-user-list', (userList: string) => {
      if (userList) {
        const parsedUserList = JSON.parse(userList);
        if (parsedUserList.length > 0) {
          updateConnectedUsers(parsedUserList);
          console.log(`Connected users ${userList}`);
        }
      }
    });

    return () => {
      socket.emit('disconnect');
    }
  }, [connectedUsers])

  useEffect(() => {
    if (roomId && shareLinkPresenter.current) shareLinkPresenter.current.classList.remove('hidden');
  }, [roomId]);


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
