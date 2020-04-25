import SocketIO, { Socket } from 'socket.io';
import { Server } from 'http';

interface ChatRoomService {
  sendCommentNotificationTo(postOwner: string, commenterUsername: string): void;
  sendLikeNotificationTo(postOwner: string, likerUsername: string): void;
}

const enum ChatRoomEvent {
  CONNECT = 'connection',
  DISCONNECT = 'disconnect',
  LOG_USER_IN = 'log-user-in',
  NOTIFY_LIKE = 'like-notification',
  NOTIFY_COMMENT = 'comment-notification',
}

export class ChatRoomServiceImpl implements ChatRoomService {
  private server: Server;

  private io: SocketIO.Server;

  private port: string;

  private connectedClients = new Map<string, string>();

  constructor(port: string, serverInstance: Server) {
    this.port = port;
    this.server = serverInstance;
    this.io = SocketIO(this.server);
    this.listen();
  }

  private listen(): void {
    console.log(`Chatroom service listening on ${this.port}`);
    this.io.on(ChatRoomEvent.CONNECT, (socket: Socket) => {
      console.log('Connection access requested.');
      socket.on(ChatRoomEvent.LOG_USER_IN, (username: string) => {
        console.log(`User ${username} logged in.`)
        if (!this.connectedClients.has(username)) this.connectedClients.set(username, socket.id);
        else if (this.connectedClients.has(username)) {
          this.connectedClients.delete(username);
          this.connectedClients.set(username, socket.id);
        }
      });

      socket.on(ChatRoomEvent.DISCONNECT, (username: string) => {
        if (this.connectedClients.has(username)) this.connectedClients.delete(username);
        console.log('Client disconnected');
      });
    });
  }

  private getPostOwnerSocket = (postOwner: string): string | undefined => {
    const socketId = this.connectedClients.get(postOwner);
    if (!postOwner) throw new Error('error');
    return socketId;
  }

  public sendCommentNotificationTo = (postOwner: string, commenterUsername: string): void => {
    const socketId = this.getPostOwnerSocket(postOwner);
    if (socketId && this.io.sockets.connected[socketId]) this.io.sockets.connected[socketId].emit(ChatRoomEvent.NOTIFY_COMMENT, commenterUsername);
  }

  public sendLikeNotificationTo = (postOwner: string, likerUsername: string): void => {
    const socketId = this.getPostOwnerSocket(postOwner);
    if (socketId && this.io.sockets.connected[socketId]) this.io.sockets.connected[socketId].emit(ChatRoomEvent.NOTIFY_LIKE, likerUsername);
  }
}

export default ChatRoomService;
