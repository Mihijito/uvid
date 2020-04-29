import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { useTypedSelector } from '../../store/uvidReducer';
// import { createOffer, createAnswer } from '../webRtc/webRtcUtils';
import { useDispatch } from 'react-redux';
// import {
//   initializeUserList,
//   addUserToUserList,
//   removeUserFromList,
//   addRemoteDescription,
//   addLocalDescription,
// } from '../../store/actions';
import ConnectedUsersCollection from '../conferenceRoom/types';

const socket = openSocket.connect('http://localhost:8080');
socket.emit('connection');

const userList = new ConnectedUsersCollection();

const SocketServerClient: React.FC = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const username = useTypedSelector((state) => state.uvidReducer.username);
  const action = useTypedSelector((state) => state.uvidReducer.connectionRequest);

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
    socket.on('initialise-userList', (connectedUsersList: string) => {
      if (connectedUsersList) {
        const parsedUserList: string[] = JSON.parse(connectedUsersList);
        if (parsedUserList.length > 0) {
          userList.addUsers(parsedUserList);
        }
      }
    });
  }, [])

  useEffect(() => {
    socket.on('user-joined', (username: string) => {
      const peerConnection = new RTCPeerConnection();
      console.log(`${username} joined`);
      if (peerConnection) {
        peerConnection.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true })
          .then((offer: RTCSessionDescriptionInit) => {
            socket.emit('call-request', JSON.stringify({ callee: username, offer }));
            console.log(`Call request sent to ${username}`)
            peerConnection.setLocalDescription(offer);
            userList.addUser(username, peerConnection);
          });
      }
    });
  }, []);

  useEffect(() => {
    socket.on('call-offer', (offerInfos: string) => {
      const { callerUsername, offer } = JSON.parse(offerInfos);
      console.log(offer);
      console.log(`Call offer received from ${callerUsername}, send answer to ${callerUsername}`);
      userList.addRemoteDescription(callerUsername, offer);
      const peerConnection = userList.get(callerUsername);
      if (peerConnection) {
        peerConnection.createAnswer()
          .then((answer: RTCSessionDescriptionInit) => {
            userList.addLocalDescription(callerUsername, answer);
            socket.emit('call-response', JSON.stringify({ callerUsername, answer }));
          });
      }
    });
  }, []);

  useEffect(() => {
    socket.on('call-answer', (offerInfos: string) => {
      const { calleeUsername, answer } = JSON.parse(offerInfos);
      if (userList.get(calleeUsername) && calleeUsername) userList.get(calleeUsername)?.setRemoteDescription(answer);
      console.log(`Call answer received from ${calleeUsername}`);
    });
  }, []);

  useEffect(() => {
    socket.on('user-disconnected', (username: string) => {
      userList.removeUser(username);
      console.log(`${username} quit`);
    });
  }, [dispatch]);

  useEffect(() => () => { socket.emit('disconnect') });

  return (null);
};

export default SocketServerClient;
