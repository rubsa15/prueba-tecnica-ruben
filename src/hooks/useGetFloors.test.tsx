import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { FloorService } from '../services/floor.service';
import { useGetFloors } from './useGetFloors';

const mockFloors = [
  {
    id: '1',
    description: 'First floor',
    rooms: [
      { id: '101', maximumCapacity: 10, occupancy: 5 },
      { id: '102', maximumCapacity: 20, occupancy: 10 },
    ],
  },
  {
    id: '2',
    description: 'Second floor',
    rooms: [
      { id: '201', maximumCapacity: 15, occupancy: 8 },
      { id: '202', maximumCapacity: 25, occupancy: 20 },
    ],
  },
];

describe('Get floors hook', () => {
  it('gets floors from service', async () => {
    vi.spyOn(FloorService, 'get').mockResolvedValue(mockFloors);

    const { result } = renderHook(() => useGetFloors());

    await waitFor(() => {
      expect(FloorService.get).toHaveBeenCalled();
      expect(result.current.floors).toEqual(mockFloors);
      expect(result.current.isLoading).toEqual(false);
    });
  });

  it('returns error from service', async () => {
    vi.spyOn(FloorService, 'get').mockRejectedValue('error');
    vi.spyOn(window.console, 'log');

    renderHook(() => useGetFloors());

    await waitFor(() => {
      expect(FloorService.get).toHaveBeenCalled();
      expect(window.console.log).toHaveBeenCalled();
    });
  });
});
