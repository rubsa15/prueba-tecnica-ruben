import { useEffect, useState } from 'react';
import { Floor } from '../domain/Floor';
import { FloorService } from '../services/floor.service';
import { floorInitialValues } from '../constants/floor';

export const useGetFloors = () => {
  const [floors, setFloors] = useState<Floor[]>(floorInitialValues);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFloors = async () => {
      try {
        const floors = await FloorService.get();
        setFloors(floors);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getFloors();
  }, []);

  return { floors, setFloors, isLoading };
};
