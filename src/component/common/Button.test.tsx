import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { describe, expect, it, vi } from 'vitest';

describe('Button component', () => {
  it('should render with the correct label', () => {
    render(<Button label='Click me' />);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render with the correct type (button by default)', () => {
    render(<Button label='Submit' />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('should render with type submit when passed as prop', () => {
    render(<Button label='Submit Form' type='submit' />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should apply the correct secondary styles when secondary is true', () => {
    render(<Button label='Secondary Button' secondary={true} />);

    expect(screen.getByText('Secondary Button')).toHaveClass(
      'border-[#2E344D] text-[#2E344D]'
    );
  });

  it('should apply the correct primary styles when secondary is false', () => {
    render(<Button label='Primary Button' />);

    expect(screen.getByText('Primary Button')).toHaveClass(
      'bg-[#2E344D] text-white'
    );
  });

  it('should call onClick function when clicked', () => {
    const handleClick = vi.fn();

    render(<Button label='Click me' onClick={handleClick} />);

    fireEvent.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
