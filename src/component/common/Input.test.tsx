import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import { formErrors } from '../../constants/formErrors';
import { describe, expect, it, vi } from 'vitest';

describe('Input component', () => {
  const mockRegister = vi.fn();

  it('should render label and input correctly', () => {
    render(
      <Input
        id='test-input'
        name='testField'
        label='Test Label'
        value={10}
        register={mockRegister}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();

    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveValue('10');
  });

  it('should apply percentage styles when percentage prop is true', () => {
    render(
      <Input
        id='percentage-input'
        name='percentageField'
        label='Percentage Input'
        value={20}
        register={mockRegister}
        percentage={true}
      />
    );

    const input = screen.getByLabelText('Percentage Input');
    expect(input).toHaveClass('pl-4 pr-8');

    const percentageSymbol = screen.getByText('%');
    expect(percentageSymbol).toBeInTheDocument();
  });

  it('should not render percentage symbol when percentage prop is false', () => {
    render(
      <Input
        id='normal-input'
        name='normalField'
        label='Normal Input'
        value={50}
        register={mockRegister}
        percentage={false}
      />
    );

    const input = screen.getByLabelText('Normal Input');
    expect(input).toHaveClass('px-4');

    const percentageSymbol = screen.queryByText('%');
    expect(percentageSymbol).not.toBeInTheDocument();
  });

  it('should render error message when validation fails', () => {
    const mockErrors = {
      testField: {
        type: 'required',
      },
    };

    render(
      <Input
        id='input-with-error'
        name='testField'
        label='Input with Error'
        value={0}
        register={mockRegister}
        errors={mockErrors}
      />
    );

    const errorMessage = screen.getByText(formErrors.required);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not render error message when no validation error', () => {
    render(
      <Input
        id='input-no-error'
        name='testField'
        label='Input without Error'
        value={0}
        register={mockRegister}
      />
    );

    const errorMessage = screen.queryByText(formErrors.required);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
