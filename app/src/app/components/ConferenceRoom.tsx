import React, { useEffect, useState, useRef } from 'react';
import SocketServerClient from './SocketServerClient';
import { useParams } from 'react-router-dom';

type ConferenceRoomProps = {
  username: string,
}

const ConferenceRoom: React.FC<ConferenceRoomProps> = () => {
  const shareLinkPresenter = useRef<HTMLDivElement>(null);
  const [connectedUsers, updateConnectedUsers] = useState<string[]>();
  const { roomId } = useParams();

  const onUserConnexions = (newlyConnectedUsers: string[]) => {
    updateConnectedUsers(newlyConnectedUsers);
  }

  useEffect(() => {
    if (roomId && shareLinkPresenter.current) shareLinkPresenter.current.classList.remove('hidden');
  }, [roomId]);

  return (
    <div>
      <SocketServerClient onConnexionOfUsers={onUserConnexions} />

      <div className="mt-12 mb-12 flex flex-col items-center">
        <div
          ref={shareLinkPresenter}
          className="hidden">
          {`Room link: ${`http://localhost:3000/joinLink/${roomId}`}`}
        </div>
        <div>
          {connectedUsers ? connectedUsers : ''}
        </div>
      </div>
    </div>
  )
};

export default ConferenceRoom;
