import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown'; // Ajusta la ruta según tu estructura de archivos
import { describe, expect, it, vi } from 'vitest';

describe('Dropdown component', () => {
  const mockOptions = [
    { key: 'option1', label: 'Option 1' },
    { key: 'option2', label: 'Option 2' },
    { key: 'option3', label: 'Option 3' },
  ];

  it('should render options correctly', () => {
    render(
      <Dropdown
        id='test-dropdown'
        name='testDropdown'
        options={mockOptions}
        value='option1'
        onChange={vi.fn()}
      />
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('should have the correct default value selected', () => {
    render(
      <Dropdown
        id='test-dropdown'
        name='testDropdown'
        options={mockOptions}
        value='option2'
        onChange={vi.fn()}
      />
    );

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement.value).toBe('option2');
  });

  it('should call onChange function with the correct value when changed', () => {
    const mockOnChange = vi.fn();

    render(
      <Dropdown
        id='test-dropdown'
        name='testDropdown'
        options={mockOptions}
        value='option1'
        onChange={mockOnChange}
      />
    );

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'option3' } });

    expect(mockOnChange).toHaveBeenCalledWith('option3');
  });
});
