import { useContext } from 'react';
import { FloorsContext } from '../context/floors.context';

export const useFloors = () => {
  const context = useContext(FloorsContext);
  if (context === undefined) {
    throw new Error('useFloorContext must be used within a FloorProvider');
  }
  return context;
};
