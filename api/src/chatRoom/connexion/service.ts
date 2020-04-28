import SocketIO, { Socket } from 'socket.io';
import { Server } from 'http';
import RoomCollection from './types';

interface ChatRoomConnexionService {
  openConnexion(): void;
}

const enum ChatRoomEvent {
  CONNECT = 'connection',
  DISCONNECT = 'disconnect',
  JOIN_ROOM = 'join-room',
  ROOM_ID = 'room-id',
  INITIALIZE_USERLIST = 'initialise-userList',
  CALL_REQUEST = 'call-request',
  CALL_OFFER = 'call-offer',
  CREATE_ROOM = 'create-room',
  USER_DISCONNECTED = 'user-disconnected',
  USER_JOINED = 'user-joined',
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

  private socketIdByUsername: Map<string, string> = new Map<string, string>();

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
      socket.on(ChatRoomEvent.CREATE_ROOM, (newRoom: string) => {
        const { username, roomId } = JSON.parse(newRoom);
        socket.join(roomId);

        this.registerUser(username, roomId, socket.id);
        this.openedRooms.addSocket(roomId, socket.id);

        this.updateClientUserList(socket, roomId);
      });

      socket.on(ChatRoomEvent.JOIN_ROOM, (newRoom: string) => {
        const { username, roomId } = JSON.parse(newRoom);
        if (username && roomId) {
          console.log(`${username} requested connection at ${socket.id}`);

          socket.join(roomId);
          this.registerUser(username, roomId, socket.id);
          this.openedRooms.addSocket(roomId, socket.id);

          this.updateClientUserList(socket, roomId);
          socket.to(roomId).emit(ChatRoomEvent.USER_JOINED, username);
        }
      });

      socket.on(ChatRoomEvent.CALL_REQUEST, (requestInfos: string) => {
        const { otherUserUsername, offer } = JSON.parse(requestInfos);
        const socketId = this.socketIdByUsername.get(otherUserUsername);

        console.log(`Call reqeuest received ${socketId}`);
        console.log(this.userBySocketId.get(socket.id)?.username);
        if (socketId) socket.to(socketId).emit(ChatRoomEvent.CALL_OFFER, this.userBySocketId.get(socket.id)?.username);
      })

      socket.on(ChatRoomEvent.DISCONNECT, () => {
        console.log('Disconnect user');
        const user = this.userBySocketId.get(socket.id);
        const roomId = user?.roomId;
        this.unregisterUser(socket.id);
        socket.to(roomId!).emit(ChatRoomEvent.USER_DISCONNECTED, user?.username);
      });
    });
  }


  private updateClientUserList(socket: Socket, roomId: string) {
    const userList = this.createClientUserList(socket, roomId);
    socket.emit(ChatRoomEvent.INITIALIZE_USERLIST, JSON.stringify(userList));
  };

  private unregisterUser = (socketId: string): boolean => {
    const user: User | undefined = this.userBySocketId.get(socketId);
    if (user) {
      this.openedRooms.removeSocket(user.roomId, socketId);
      this.userBySocketId.delete(socketId);
      this.socketIdByUsername.delete(user.username);
      console.log(`${user.username} unregistered`);
      return true;
    }
    console.log('User not found');
    return false;
  };

  private registerUser = (username: string, roomId: string, socketId: string) => {
    const user: User = { username, roomId };
    this.userBySocketId.set(socketId, user);
    this.socketIdByUsername.set(user.username, socketId);
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
