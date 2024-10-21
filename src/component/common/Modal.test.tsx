import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import { describe, expect, it } from 'vitest';

describe('Modal component', () => {
  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });
});
