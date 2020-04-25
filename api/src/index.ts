import { createServer } from 'http';
import { ChatRoomServiceImpl } from './chatRoom';

const httpServer = createServer();
const chatRoomService = new ChatRoomServiceImpl(httpServer, '8080');
chatRoomService.openChatRoomServer();