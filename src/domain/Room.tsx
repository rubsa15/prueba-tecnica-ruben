export interface Room {
  id: string;
  maximumCapacity: number | undefined;
  occupancy: number | undefined;
}

export interface RoomDto {
  id: string;
  maximumCapacity: number | undefined;
  occupancy: number | undefined;
}
