import { Floor, FloorDto, FloorServiceType } from '../domain/Floor';

const mapFloors = (floors: FloorDto[]): Floor[] => {
  return floors.map((floor) => {
    return {
      id: floor.id,
      description: floor.description,
      rooms: floor.rooms.map((room) => ({
        id: room.id,
        maximumCapacity: room.maximumCapacity,
        occupancy: room.occupancy,
      })),
    };
  });
};

export const FloorService: FloorServiceType = {
  get: async () => {
    try {
      const response = await fetch('https://apimocha.com/ruben/floors');
      const floors = await response.json();
      const mappedFloors = mapFloors(floors);
      return mappedFloors;
    } catch (error) {
      console.log(error);
      return;
    }
  },
};
