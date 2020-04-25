import Home from '../components/Home';
import ConferenceRoom from '../components/ConferenceRoom';

const routes: RouteDef[] = [
  {
    path: '/conferenceRoom/:username',
    component: ConferenceRoom,
  },
  {
    path: '/',
    component: Home,
  },
];

export default routes;