import { createServer } from 'http';
import { ChatRoomServiceImpl } from './chatRoom';

const httpServer = createServer();
httpServer.listen(8080);
const chatRoomService = new ChatRoomServiceImpl('8080', httpServer);