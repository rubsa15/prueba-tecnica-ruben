import { render, screen } from '@testing-library/react';
import App from './App';
import * as floorsHook from './hooks/useFloors';
import { beforeEach, describe, expect, it, vi } from 'vitest';
const mockSelectedFloor = {
  id: 'floor1',
  description: 'Piso 1',
  rooms: [
    { id: 'room1', maximumCapacity: 50, occupancy: 25 },
    { id: 'room2', maximumCapacity: 30, occupancy: 20 },
  ],
};

const mockFloorsOptions = [
  { key: '1', label: 'Piso 1' },
  { key: '2', label: 'Piso 2' },
];

describe('App component', () => {
  beforeEach(() => {
    vi.spyOn(floorsHook, 'useFloors').mockReturnValue({
      updateRoom: vi.fn(),
      deleteRoom: vi.fn(),
      isLoading: false,
      addRoom: vi.fn(),
      floorsOptions: mockFloorsOptions,
      updateSelectedFloor: vi.fn(),
      selectedFloor: mockSelectedFloor,
      selectedFloorId: 'floor1',
    });
  });

  it('should render the correct structure', () => {
    render(<App />);

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
    expect(screen.getAllByText('Sala piso 1').length).toBe(2);
  });
});
