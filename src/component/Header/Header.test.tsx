import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import * as floorsHook from '../../hooks/useFloors';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Header component', () => {
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

    render(<Header />);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should render the dropdown with the correct options when isLoading is false', () => {
    const mockFloorsOptions = [
      { key: '1', label: 'Piso 1' },
      { key: '2', label: 'Piso 2' },
    ];

    vi.spyOn(floorsHook, 'useFloors').mockReturnValue({
      updateRoom: vi.fn(),
      deleteRoom: vi.fn(),
      isLoading: false,
      addRoom: vi.fn(),
      floorsOptions: mockFloorsOptions,
      updateSelectedFloor: vi.fn(),
      selectedFloor: undefined,
      selectedFloorId: '',
    });

    render(<Header />);

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();

    expect(screen.getByText('Piso 1')).toBeInTheDocument();
    expect(screen.getByText('Piso 2')).toBeInTheDocument();
  });

  it('should call updateSelectedFloor when a new option is selected', () => {
    const mockUpdateSelectedFloor = vi.fn();
    const mockFloorsOptions = [
      { key: '1', label: 'Piso 1' },
      { key: '2', label: 'Piso 2' },
    ];

    vi.spyOn(floorsHook, 'useFloors').mockReturnValue({
      updateRoom: vi.fn(),
      deleteRoom: vi.fn(),
      isLoading: false,
      addRoom: vi.fn(),
      floorsOptions: mockFloorsOptions,
      updateSelectedFloor: mockUpdateSelectedFloor,
      selectedFloor: undefined,
      selectedFloorId: '',
    });

    render(<Header />);

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: '2' } });

    expect(mockUpdateSelectedFloor).toHaveBeenCalledWith('2');
  });
});
