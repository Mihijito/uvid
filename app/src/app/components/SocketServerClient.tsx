import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { useTypedSelector } from '../../store/uvidReducer';
//import { makeRtcConnexion, createOffer } from '../webRtc/webRtcUtils';
import { useDispatch } from 'react-redux';
import { initializeUserList, addUserToUserList, removeUserFromList } from '../../store/actions';

type SocketServerClientProps = {
  onConnexionOfUsers: Function,
}

const socket = openSocket.connect('http://localhost:8080');
socket.emit('connection');
//const peerConnexion = makeRtcConnexion();

const SocketServerClient: React.FC<SocketServerClientProps> = ({ onConnexionOfUsers }) => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const username = useTypedSelector((state) => state.uvidReducer.username);
  const action = useTypedSelector((state) => state.uvidReducer.connectionRequest);
  const userList = useTypedSelector((state) => state.uvidReducer.userList);


  useEffect(() => {
    if (!userList.empty) onConnexionOfUsers(Object.keys(userList));
  }, [userList])

  useEffect(() => {
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
        const parsedUserList: string[] = JSON.parse(userList);
        if (parsedUserList.length > 0) {
          dispatch(initializeUserList(parsedUserList));
        }
      }
    });
  }, [dispatch])

  useEffect(() => {
    socket.on('call-offer', (username: string) => {
      console.log(`Call offer received from ${username}`);
    });
  });

  useEffect(() => {
    socket.on('user-joined', (username: string) => {
      dispatch(addUserToUserList(username))
      console.log(`${username} joined`)
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('user-disconnected', (username: string) => {
      dispatch(removeUserFromList(username));
      console.log(`${username} quit`);
    });
  }, [dispatch]);

  useEffect(() => () => { socket.emit('disconnect') });

  return (null);
};

export default SocketServerClient;
