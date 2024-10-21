import { describe, it, expect, vi } from 'vitest';
import { FloorService } from './floor.service';

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

describe('Floor service', () => {
  it('gets floors with promise resolve', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockFloors),
      } as Response);
    });

    const episodes = await FloorService.get();

    expect(window.fetch).toHaveBeenCalledWith(
      'https://apimocha.com/ruben/floors'
    );
    expect(episodes).toEqual(mockFloors);
  });

  it('gets floor with promise rejected', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.reject('error'),
      } as Response);
    });
    vi.spyOn(window.console, 'log');

    await FloorService.get();

    expect(window.fetch).toHaveBeenCalledWith(
      'https://apimocha.com/ruben/floors'
    );
    expect(window.console.log).toHaveBeenCalled();
  });
});
