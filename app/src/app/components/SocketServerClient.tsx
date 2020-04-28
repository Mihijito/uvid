import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { useTypedSelector } from '../../store/uvidReducer';
import { createOffer, makeRtcConnexion } from '../webRtc/webRtcUtils';
import { useDispatch } from 'react-redux';
import { initializeUserList, addUserToUserList, removeUserFromList } from '../../store/actions';

const socket = openSocket.connect('http://localhost:8080');
socket.emit('connection');

const SocketServerClient: React.FC = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const username = useTypedSelector((state) => state.uvidReducer.username);
  const action = useTypedSelector((state) => state.uvidReducer.connectionRequest);
  const [peerConnection, createPeerConnection] = useState<RTCPeerConnection>();

  useEffect(() => {
    if (username && roomId && action === 'create') {
      console.log(`Create ${roomId}`)
      socket.emit('create-room', JSON.stringify({ username, roomId }));
      const newPeerConnection = makeRtcConnexion();
      createPeerConnection(newPeerConnection)
    } else if (username && roomId && action === 'join') {
      console.log(`Join ${roomId}`)
      socket.emit('join-room', JSON.stringify({ username, roomId }));
      const newPeerConnection = makeRtcConnexion();
      createPeerConnection(newPeerConnection)
    }
  }, [username, roomId, action, dispatch]);

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
  }, []);

  useEffect(() => {
    socket.on('user-joined', (username: string) => {
      dispatch(addUserToUserList(username))
      if (peerConnection) {
        const offer = createOffer(peerConnection);
        offer.then(() => {
          socket.emit('call-request', JSON.stringify({ username, offer }));
          console.log(`Call request sent to ${username}`)
        })
      }
      console.log(`${username} joined`);
    });
  }, [dispatch, peerConnection]);

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
