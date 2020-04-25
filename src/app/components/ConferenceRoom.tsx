import React from 'react';
import { useParams } from 'react-router-dom';

const ConferenceRoom: React.FC = () => {
  const { username } = useParams();

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