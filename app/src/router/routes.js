import Home from '../components/Home';
import Room from '../components/Room';
import RoomLobby from '../components/RoomLobby';

const routes = [
    {
        name: 'Join',
        path: '/join/:roomId',
        component: RoomLobby,
        props: true,
    },
    {
        name: 'Room',
        path: '/:roomId',
        component: Room,
        props: true,
    },
    {
        name: 'Home',
        path: '/',
        component: Home,
    }
]

export default routes;