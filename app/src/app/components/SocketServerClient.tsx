import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import openSocket from 'socket.io-client';
import ConnectedUsersCollection from '../conferenceRoom/types';
import { useTypedSelector } from '../../store/uvidReducer';

type SocketServerClientProps = {
  onConnexionOfUsers: Function,
}

const socket = openSocket.connect('http://localhost:8080');
socket.emit('connection');

const SocketServerClient: React.FC<SocketServerClientProps> = ({ onConnexionOfUsers }) => {
  const { roomId } = useParams();
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUsersCollection>();
  const username = useTypedSelector((state) => state.uvidReducer.username);
  const action = useTypedSelector((state) => state.uvidReducer.connectionRequest);

  useEffect(() => {
    if (!connectedUsers) {
      setConnectedUsers(new ConnectedUsersCollection());
    }
  }, [connectedUsers, setConnectedUsers])

  useEffect(() => {
    console.log(username)
    console.log(roomId)
    console.log(action)
    if (username && roomId && action === 'create') {
      console.log(`Create ${roomId}`)
      socket.emit('create-room', JSON.stringify({ username, roomId }));
    } else if (username && roomId && action === 'join') {
      console.log(`Join ${roomId}`)
      socket.emit('join-room', JSON.stringify({ username, roomId }));
    }
  }, [username, roomId, action]);

  useEffect(() => {
    socket.on('initialise-userList', (userList: string) => {
      if (userList) {
        const parsedUserList = JSON.parse(userList);
        if (parsedUserList.length > 0) {
          if (connectedUsers) {
            connectedUsers.addUsers(parsedUserList);
            console.log(`Connected users ${userList}`);
          }
          onConnexionOfUsers(parsedUserList);
        }
      }
    });

    socket.on('user-joined', (username: string) => {
      if (connectedUsers) {
        console.log(`${username} joined`)
        connectedUsers.addUser(username);
      }
    });

    socket.on('call-offer', (username: string) => {
      console.log(`Call offer received from ${username}`);
    });

    return () => {
      socket.emit('disconnect');
    }
  }, [connectedUsers])

  useEffect(() => {
    socket.on('user-disconnected', (username: string) => {
      if (connectedUsers && connectedUsers.userConnected(username)) {
        connectedUsers.removeUser(username);

        console.log(`${username} quit`);
      }
    });
  }, [connectedUsers]);

  return (null);
};

export default SocketServerClient;
