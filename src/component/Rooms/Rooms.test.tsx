import { render, screen, fireEvent } from '@testing-library/react';
import { Rooms } from './Rooms';
import * as floorsHook from '../../hooks/useFloors';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Rooms component', () => {
  beforeEach(() => {
    vi.spyOn(floorsHook, 'useFloors').mockReturnValue({
      updateRoom: vi.fn(),
      deleteRoom: vi.fn(),
      isLoading: false,
      addRoom: vi.fn(),
      floorsOptions: [],
      updateSelectedFloor: vi.fn(),
      selectedFloor: undefined,
      selectedFloorId: '',
    });
  });

  it('should display loading state when isLoading is true', () => {
    vi.spyOn(floorsHook, 'useFloors').mockReturnValue({
      updateRoom: vi.fn(),
      deleteRoom: vi.fn(),
      isLoading: true,
      addRoom: vi.fn(),
      floorsOptions: [],
      updateSelectedFloor: vi.fn(),
      selectedFloor: undefined,
      selectedFloorId: '',
    });

    render(<Rooms />);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should render the floor description and rooms when isLoading is false', () => {
    const mockSelectedFloor = {
      id: 'floor1',
      description: 'Piso 1',
      rooms: [
        { id: 'room1', maximumCapacity: 50, occupancy: 25 },
        { id: 'room2', maximumCapacity: 30, occupancy: 20 },
      ],
    };
    vi.spyOn(floorsHook, 'useFloors').mockReturnValue({
      updateRoom: vi.fn(),
      deleteRoom: vi.fn(),
      isLoading: false,
      addRoom: vi.fn(),
      floorsOptions: [],
      updateSelectedFloor: vi.fn(),
      selectedFloor: mockSelectedFloor,
      selectedFloorId: '',
    });

    render(<Rooms />);

    expect(screen.getByText('Piso 1')).toBeInTheDocument();

    expect(screen.getAllByText('Sala piso 1').length).toBe(2);
    expect(screen.getAllByText('Capacidad máxima').length).toBe(2);
  });

  it('should call addRoom when "Añadir sala" button is clicked', () => {
    const mockAddRoom = vi.fn();
    const mockSelectedFloor = {
      id: 'floor1',
      description: 'Piso 1',
      rooms: [
        { id: 'room1', maximumCapacity: 50, occupancy: 25 },
        { id: 'room2', maximumCapacity: 30, occupancy: 20 },
      ],
    };

    vi.spyOn(floorsHook, 'useFloors').mockReturnValue({
      updateRoom: vi.fn(),
      deleteRoom: vi.fn(),
      isLoading: false,
      addRoom: mockAddRoom,
      floorsOptions: [],
      updateSelectedFloor: vi.fn(),
      selectedFloor: mockSelectedFloor,
      selectedFloorId: '',
    });

    render(<Rooms />);

    fireEvent.click(screen.getByText('Añadir sala'));

    expect(mockAddRoom).toHaveBeenCalled();
  });

  it('should not render rooms when selectedFloor has no rooms', () => {
    const mockSelectedFloor = {
      id: 'floor1',
      description: 'Piso 1',
      rooms: [],
    };

    vi.spyOn(floorsHook, 'useFloors').mockReturnValue({
      updateRoom: vi.fn(),
      deleteRoom: vi.fn(),
      isLoading: false,
      addRoom: vi.fn(),
      floorsOptions: [],
      updateSelectedFloor: vi.fn(),
      selectedFloor: mockSelectedFloor,
      selectedFloorId: '',
    });

    render(<Rooms />);

    expect(screen.getByText('Piso 1')).toBeInTheDocument();

    expect(screen.queryByText('Capacidad máxima')).toBeNull();
  });
});
