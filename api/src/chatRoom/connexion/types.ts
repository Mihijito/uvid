export default class RoomCollection {
  private socketsByRoomId: { [key: string]: string[] } = {};

  private createNewRoom = (roomId: string) => {
    if (!this.socketsByRoomId[roomId]) this.socketsByRoomId[roomId] = [];
  };

  public addSocket = (roomId: string, socketId: string): void => {
    if (this.has(roomId)) this.socketsByRoomId[roomId].push(socketId)
    else {
      this.createNewRoom(roomId);
      this.socketsByRoomId[roomId].push(socketId);
    }
  };

  public getRoom = (roomId: string): string[] => {
    return this.socketsByRoomId[roomId];
  }

  public removeSocket = (roomId: string, socketId: string) => {
    console.log(`Remove socket ${socketId}`);
    const socketIdIndex = this.socketsByRoomId[roomId].indexOf(socketId);
    if (socketIdIndex > -1) {
      this.socketsByRoomId[roomId].splice(socketIdIndex, 1);
    }
    console.log(this.socketsByRoomId[roomId]);
  };

  private has = (roomId: string) => {
    return this.socketsByRoomId[roomId] !== undefined;
  }


};

