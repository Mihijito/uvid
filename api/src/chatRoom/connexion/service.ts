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
  UPDATE_USER_LIST = 'update-user-list',

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
        console.log(`${username} requested connection at ${socket.id}`);

        socket.join(roomId);
        this.registerUser(username, roomId, socket.id);
        this.openedRooms.addSocket(roomId, socket.id);

        const userList = this.createClientUserList(socket, roomId);
        this.io.to(roomId).emit(ChatRoomEvent.UPDATE_USER_LIST, JSON.stringify(userList));
      });

      socket.on(ChatRoomEvent.DISCONNECT, () => {
        console.log('Disconnect user');
        this.unregisterUser(socket.id);
        //update client user list
      });
    });
  }

  private unregisterUser = (socketId: string) => {
    const user: User | undefined = this.userBySocketId.get(socketId);
    if (user) {
      this.openedRooms.removeSocket(user.roomId, socketId);
      this.userBySocketId.delete(socketId);
      console.log(`${user.username} unregistered`);
    } else console.log('User not found');
  };

  private registerUser = (username: string, roomId: string, socketId: string) => {
    const user: User = { username, roomId };
    this.userBySocketId.set(socketId, user);
    console.log(`${user.username} registered`)
  };

  private createClientUserList = (socket: Socket, roomId: string): string[] => {
    const connectedSockets = this.openedRooms.getRoom(roomId);

    const usernameList: string[] = connectedSockets.reduce<string[]>((usernameList, socketId: string) => {
      usernameList.push(this.userBySocketId.get(socketId)!.username)
      return usernameList;
    }, [])

    return usernameList;
  };

  public openConnexion = () => {
    this.listen();
  }
}

export default ChatRoomConnexionService;
