import { Room, RoomDto } from './Room';

export interface Floor {
  id: string;
  description: string;
  rooms: Room[];
}

export interface FloorDto {
  id: string;
  description: string;
  rooms: RoomDto[];
}

export interface FloorServiceType {
  get: () => Promise<Floor[]>;
}
