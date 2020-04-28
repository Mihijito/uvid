import React, { useEffect, useRef } from 'react';
import SocketServerClient from './SocketServerClient';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../store/uvidReducer';

type ConferenceRoomProps = {
  username: string,
}

const ConferenceRoom: React.FC<ConferenceRoomProps> = () => {
  const shareLinkPresenter = useRef<HTMLDivElement>(null);
  const { roomId } = useParams();
  const userList = useTypedSelector((state) => state.uvidReducer.userList);

  useEffect(() => {
    if (roomId && shareLinkPresenter.current) shareLinkPresenter.current.classList.remove('hidden');
  }, [roomId]);

  return (
    <div>
      <SocketServerClient />

      <div className="mt-12 mb-12 flex flex-col items-center">
        <div
          ref={shareLinkPresenter}
          className="hidden">
          {`Room link: ${`http://localhost:3000/joinLink/${roomId}`}`}
        </div>
        <div>
          {Object.keys(userList)}
        </div>
      </div>
    </div>
  )
};

export default ConferenceRoom;
