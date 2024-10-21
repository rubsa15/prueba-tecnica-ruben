import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useContext } from 'react';
import * as getFloorsHook from '../hooks/useGetFloors';
import { FloorsContext, FloorsProvider } from './floors.context';

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

const mockRoom = { id: '101', maximumCapacity: 11, occupancy: 5 };

const mockSelectedFloor = '2';

const mockDeleteRoomId = '101';

const TestComponent = () => {
  const context = useContext(FloorsContext);
  if (!context) {
    return null;
  }
  return (
    <>
      <div>SelectedFloor: {context.selectedFloor?.id}</div>
      <div>IsLoading: {context.isLoading.toString()}</div>
      <div>FloorOptions: {context.floorsOptions[0].label}</div>
      <div>SelectedFloorId: {context.selectedFloorId}</div>
      <button
        data-testid='updateSelectedFloor'
        onClick={() => context.updateSelectedFloor(mockSelectedFloor)}
      ></button>
      <button
        data-testid='updateRoom'
        onClick={() => context.updateRoom(mockRoom)}
      ></button>
      <button data-testid='addRoom' onClick={() => context.addRoom()}></button>
      <button
        data-testid='deleteRoom'
        onClick={() => context.deleteRoom(mockDeleteRoomId)}
      ></button>
    </>
  );
};

describe('FloorContext', () => {
  it('provides context values correctly', async () => {
    vi.spyOn(getFloorsHook, 'useGetFloors').mockReturnValue({
      isLoading: false,
      setFloors: vi.fn(),
      floors: mockFloors,
    });

    render(
      <FloorsProvider>
        <TestComponent />
      </FloorsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('SelectedFloor: 1')).toBeInTheDocument();
      expect(screen.getByText(/IsLoading: false/)).toBeInTheDocument();
      expect(screen.getByText('FloorOptions: First floor')).toBeInTheDocument();
      expect(screen.getByText('SelectedFloorId: 1')).toBeInTheDocument();
    });
  });

  it('updates the selected floor correctly', async () => {
    vi.spyOn(getFloorsHook, 'useGetFloors').mockReturnValue({
      isLoading: false,
      setFloors: vi.fn(),
      floors: mockFloors,
    });

    render(
      <FloorsProvider>
        <TestComponent />
      </FloorsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('SelectedFloor: 1')).toBeInTheDocument();
    });

    const updateSelectedFloorButton = screen.getByTestId('updateSelectedFloor');
    updateSelectedFloorButton.click();

    await waitFor(() => {
      expect(screen.getByText('SelectedFloor: 2')).toBeInTheDocument();
    });
  });

  it('updates the room correctly', async () => {
    const mockNewFloors = structuredClone(mockFloors);
    mockNewFloors[0].rooms[0] = mockRoom;
    const setFloors = vi.fn();
    vi.spyOn(getFloorsHook, 'useGetFloors').mockReturnValue({
      isLoading: false,
      setFloors: setFloors,
      floors: mockFloors,
    });

    render(
      <FloorsProvider>
        <TestComponent />
      </FloorsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('SelectedFloor: 1')).toBeInTheDocument();
    });

    const updateRoomButton = screen.getByTestId('updateRoom');
    updateRoomButton.click();

    expect(setFloors).toHaveBeenCalledWith(mockNewFloors);
  });

  it('adds a new room correctly', async () => {
    const mockNewFloors = structuredClone(mockFloors);
    mockNewFloors[0].rooms[2] = {
      id: expect.any(String),
      maximumCapacity: undefined,
      occupancy: undefined,
    };
    const setFloors = vi.fn();
    vi.spyOn(getFloorsHook, 'useGetFloors').mockReturnValue({
      isLoading: false,
      setFloors: setFloors,
      floors: mockFloors,
    });

    render(
      <FloorsProvider>
        <TestComponent />
      </FloorsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('SelectedFloor: 1')).toBeInTheDocument();
    });

    const addRoomButton = screen.getByTestId('addRoom');
    addRoomButton.click();

    expect(setFloors).toHaveBeenCalledWith(mockNewFloors);
  });

  it('deletes a room correctly', async () => {
    const mockNewFloors = structuredClone(mockFloors);
    mockNewFloors[0].rooms.shift();
    const setFloors = vi.fn();
    vi.spyOn(getFloorsHook, 'useGetFloors').mockReturnValue({
      isLoading: false,
      setFloors: setFloors,
      floors: mockFloors,
    });

    render(
      <FloorsProvider>
        <TestComponent />
      </FloorsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('SelectedFloor: 1')).toBeInTheDocument();
    });

    const deleteRoomButton = screen.getByTestId('deleteRoom');
    deleteRoomButton.click();

    expect(setFloors).toHaveBeenCalledWith(mockNewFloors);
  });
});
