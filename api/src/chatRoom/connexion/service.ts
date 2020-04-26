import SocketIO, { Socket } from 'socket.io';
import { Server } from 'http';
import RoomCollection from './types';

interface ChatRoomConnexionService {
  openConnexion(): void;
}

const enum ChatRoomEvent {
  CONNECT = 'connection',
  DISCONNECT = 'disconnect',
  CONNECT_TO_ROOM = 'connect-to-room',
  ROOM_ID = 'room-id',
  JOIN_ROOM = 'join-room',
  CONNECTED_USERS_IN_ROOM = 'connected-users-in-room',
}

type User = {
  username: string,
  roomId: string,
}

export class ChatRoomConnexionServiceImpl implements ChatRoomConnexionService {
  private server: Server;

  private io: SocketIO.Server;

  private port: string;

  private userBySocketId: Map<string, User> = new Map<string, User>();

  private openedRooms: RoomCollection;

  constructor(port: string, serverInstance: Server) {
    this.port = port;
    this.server = serverInstance;
    this.io = SocketIO(this.server);
    this.openedRooms = new RoomCollection();
  }

  private listen(): void {
    console.log(`Chatroom service listening on ${this.port}`);

    this.io.on(ChatRoomEvent.CONNECT, (socket: Socket) => {
      socket.on(ChatRoomEvent.CONNECT_TO_ROOM, (newRoom: string) => {
        const { username, roomId } = JSON.parse(newRoom);

        this.registerUser(username, roomId, socket.id);
        this.openedRooms.addSocket(roomId, socket.id);
        console.log(`${username} connected at ${socket.id}`);

        //update client user list
        console.log(this.userBySocketId.get(socket.id));
        console.log(this.openedRooms.getRoom(roomId));
      });

      socket.on(ChatRoomEvent.DISCONNECT, () => {
        console.log('Disconnect user');
        this.unregisterUser(socket.id);
        //update client user list
        //console.log(`${username} disconnected`);
      });
    });
  }

  private unregisterUser = (socketId: string) => {
    const user: User | undefined = this.userBySocketId.get(socketId);
    console.log(user);
    if (user) {
      this.openedRooms.removeSocket(user.roomId, socketId);
      this.userBySocketId.delete(socketId);
      console.log(this.userBySocketId.get(socketId));
      console.log(this.openedRooms.getRoom(user.roomId));
    } else console.log('User not found');
  };

  private registerUser = (username: string, roomId: string, socketId: string) => {
    const user: User = { username, roomId };
    this.userBySocketId.set(socketId, user);
  };

  public openConnexion = () => {
    this.listen();
  }
}

export default ChatRoomConnexionService;
