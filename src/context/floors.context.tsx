import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { useGetFloors } from '../hooks/useGetFloors';
import { Floor } from '../domain/Floor';
import { Room } from '../domain/Room';
import { v4 as uuidv4 } from 'uuid';

interface FloorsContextType {
  isLoading: boolean;
  floorsOptions: { key: string; label: string }[];
  updateSelectedFloor: (floorId: string) => void;
  selectedFloorId: string;
  selectedFloor: Floor | undefined;
  updateRoom: (room: Room) => void;
  addRoom: () => void;
  deleteRoom: (roomId: string) => void;
}

const FloorsContext = createContext<FloorsContextType | undefined>(undefined);

const FloorsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { floors, setFloors, isLoading } = useGetFloors();
  const [selectedFloorId, setSelectedFloorId] = useState<string>('');

  useEffect(() => {
    if (!isLoading) {
      setSelectedFloorId(floors[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const floorsOptions = useMemo(() => {
    return floors?.map((floor) => ({
      key: floor.id,
      label: floor.description,
    }));
  }, [floors]);

  const updateSelectedFloor = (floorId: string) => {
    setSelectedFloorId(floorId);
  };

  const selectedFloor = useMemo(() => {
    return floors.find((floor) => floor.id === selectedFloorId);
  }, [selectedFloorId, floors]);

  const updateRoom = (updatedRoom: Room) => {
    const newFloors = floors.map((floor) => {
      if (floor.id === selectedFloorId) {
        return {
          ...floor,
          rooms: floor.rooms.map((room) =>
            room.id === updatedRoom.id ? updatedRoom : room
          ),
        };
      }
      return floor;
    });

    setFloors(newFloors);
  };

  const getIndexSelectedFloor = () =>
    floors?.findIndex((floor) => floor.id === selectedFloorId);

  const addRoom = () => {
    const indexFloor = getIndexSelectedFloor();
    const clonedFloors = structuredClone(floors);
    const newRoom = {
      id: uuidv4().toString(),
      maximumCapacity: undefined,
      occupancy: undefined,
    };
    clonedFloors[indexFloor].rooms.push(newRoom);

    setFloors(clonedFloors);
  };

  const deleteRoom = (roomId: string) => {
    const indexFloor = getIndexSelectedFloor();
    const clonedFloors = structuredClone(floors);
    clonedFloors[indexFloor].rooms = clonedFloors[indexFloor].rooms.filter(
      (room) => room.id !== roomId
    );

    setFloors(clonedFloors);
  };

  return (
    <FloorsContext.Provider
      value={{
        isLoading,
        floorsOptions,
        updateSelectedFloor,
        selectedFloorId,
        selectedFloor,
        updateRoom,
        addRoom,
        deleteRoom,
      }}
    >
      {children}
    </FloorsContext.Provider>
  );
};

export { FloorsProvider, FloorsContext };
