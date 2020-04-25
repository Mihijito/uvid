import ShortId from 'shortid';

export class RoomId {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue = (): string => {
    return this.value;
  }
};

export default function generateId(): RoomId {
  return new RoomId(ShortId.generate());
}
