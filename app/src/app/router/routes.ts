import Home from '../components/Home';
import ConferenceRoom from '../components/ConferenceRoom';
import JoinRoom from '../components/JoinRoom';
import JoinLink from '../components/JoinLink';

const routes: RouteDef[] = [
  {
    path: '/joinLink/:roomId',
    component: JoinLink,
  },
  {
    path: '/join',
    component: JoinRoom,
  },
  {
    path: '/:roomId',
    component: ConferenceRoom,
  },
  {
    path: '/',
    component: Home,
  },
];

export default routes;