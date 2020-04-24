import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <div className="mt-12 mb-12 flex flex-col items-center">
      <div>
        Welcome to UVID
    </div>
      <div>
        <input className="text-black text-center" type="text" placeholder="Please enter your name" />
      </div>
      <div>
        <Link to="conferenceRoom">
          <button>
            Create a room
          </button>
        </Link>
      </div>
    </div>
  )
};

export default Home;
