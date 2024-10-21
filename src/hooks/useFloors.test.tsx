import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { FloorsProvider } from '../context/floors.context';
import { useFloors } from './useFloors';

const selectedFloorMock = {
  description: '',
  id: '',
  rooms: [
    {
      id: '',
      maximumCapacity: undefined,
      occupancy: undefined,
    },
  ],
};

describe('floors hook', () => {
  it('should throw error when context is undefined', () => {
    expect(() => {
      renderHook(() => useFloors());
    }).toThrow('useFloorContext must be used within a FloorProvider');
  });

  it('should return context when used within FloorsProvider', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <FloorsProvider>{children}</FloorsProvider>
    );

    const { result } = renderHook(() => useFloors(), { wrapper });

    expect(result.current.selectedFloor).toEqual(selectedFloorMock);
  });
});
