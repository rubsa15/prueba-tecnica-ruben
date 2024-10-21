import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useModal } from './useModal';

describe('Modal hook', () => {
  it('returns inital status', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isModalOpen).toEqual(false);
  });

  it('returns initial status after call open modal', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isModalOpen).toEqual(true);
  });
});
