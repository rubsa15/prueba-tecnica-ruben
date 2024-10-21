import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Room } from './Room';
import * as floorsHook from '../../hooks/useFloors';
import * as modalHook from '../../hooks/useModal';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Room component', () => {
  const mockUpdateRoom = vi.fn();
  const mockDeleteRoom = vi.fn();
  const mockOpenModal = vi.fn();

  beforeEach(() => {
    vi.spyOn(floorsHook, 'useFloors').mockReturnValue({
      updateRoom: mockUpdateRoom,
      deleteRoom: mockDeleteRoom,
      isLoading: false,
      addRoom: vi.fn(),
      floorsOptions: [],
      updateSelectedFloor: vi.fn(),
      selectedFloor: undefined,
      selectedFloorId: '',
    });

    vi.spyOn(modalHook, 'useModal').mockReturnValue({
      openModal: mockOpenModal,
      isModalOpen: false,
    });
  });

  const mockRoom = {
    id: 'room1',
    maximumCapacity: 50,
    occupancy: 25,
  };

  it('should render correctly with inputs and buttons', () => {
    render(<Room floorDescription='Floor 1' room={mockRoom} />);

    expect(screen.getByLabelText('Capacidad máxima')).toBeInTheDocument();
    expect(screen.getByLabelText('Ocupación')).toBeInTheDocument();

    expect(screen.getByText('Eliminar')).toBeInTheDocument();
    expect(screen.getByText('Modificar')).toBeInTheDocument();
  });

  it('should call updateRoom and openModal on form submission', async () => {
    render(<Room floorDescription='Floor 1' room={mockRoom} />);

    fireEvent.change(screen.getByLabelText('Capacidad máxima'), {
      target: { value: '60' },
    });

    fireEvent.change(screen.getByLabelText('Ocupación'), {
      target: { value: '30' },
    });

    fireEvent.click(screen.getByText('Modificar'));

    await waitFor(() =>
      expect(mockUpdateRoom).toHaveBeenCalledWith({
        id: 'room1',
        maximumCapacity: 60,
        occupancy: 30,
      })
    );

    await waitFor(() => expect(mockOpenModal).toHaveBeenCalled());
  });

  it('should call deleteRoom when the delete button is clicked', () => {
    render(<Room floorDescription='Floor 1' room={mockRoom} />);

    fireEvent.click(screen.getByText('Eliminar'));

    expect(mockDeleteRoom).toHaveBeenCalledWith('room1');
  });

  it('should display the modal when isModalOpen is true', () => {
    vi.spyOn(modalHook, 'useModal').mockReturnValue({
      openModal: mockOpenModal,
      isModalOpen: true,
    });

    render(<Room floorDescription='Floor 1' room={mockRoom} />);

    expect(
      screen.getByText('La sala ha sido modificada correctamente')
    ).toBeInTheDocument();
  });
});
