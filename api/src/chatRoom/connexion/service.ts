import SocketIO, { Socket } from 'socket.io';
import { Server } from 'http';
import generateId, { RoomId } from './idGenerator';

interface ChatRoomConnexionService {
  openConnexion(): void;
}

const enum ChatRoomEvent {
  CONNECT = 'connection',
  DISCONNECT = 'disconnect',
  CREATE_ROOM = 'create-room',
  ROOM_ID = 'room-id'
}

type room = {
  socketId: string,
  roomId: RoomId,
}

export class ChatRoomConnexionServiceImpl implements ChatRoomConnexionService {
  private server: Server;

  private io: SocketIO.Server;

  private port: string;

  private clientRoomsByClientUsername = new Map<string, room>();

  constructor(port: string, serverInstance: Server) {
    this.port = port;
    this.server = serverInstance;
    this.io = SocketIO(this.server);
  }

  private listen(): void {
    console.log(`Chatroom service listening on ${this.port}`);

    this.io.on(ChatRoomEvent.CONNECT, (socket: Socket) => {
      socket.on(ChatRoomEvent.CREATE_ROOM, (username: string) => {
        const roomId: RoomId = generateId();
        socket.emit(ChatRoomEvent.ROOM_ID, roomId.getValue());

        this.registerClientRoom(username, roomId, socket.id);
        console.log(`Created ${username}'s room.`);
        console.log(this.clientRoomsByClientUsername.get(username));
      });

      socket.on(ChatRoomEvent.DISCONNECT, (username: string) => {
        if (this.clientRoomsByClientUsername.has(username)) this.clientRoomsByClientUsername.delete(username);
        console.log('Client disconnected');
      });
    });
  }

  private registerClientRoom = (clientUsername: string, roomId: RoomId, socketId: string) => {
    if (!this.clientRoomsByClientUsername.has(clientUsername)) this.clientRoomsByClientUsername.set(clientUsername, { socketId, roomId });
    else if (this.clientRoomsByClientUsername.has(clientUsername)) {
      this.clientRoomsByClientUsername.delete(clientUsername);
      this.clientRoomsByClientUsername.set(clientUsername, { socketId, roomId });
    }
  };

  public openConnexion = () => {
    this.listen();
  }
}

export default ChatRoomConnexionService;
