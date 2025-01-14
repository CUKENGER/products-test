import { act, renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { useDebounce } from './useDebounce'

describe.skip('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should return init value', () => {
    const { result } = renderHook(() => useDebounce('test', 500))
    expect(result.current).toBe('test')
  })

  test('should update value with interval', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'test' },
      }
    )

    rerender({ value: 'new value' })

    act(() => {
      vi.advanceTimersByTime(520)
    })

    expect(result.current).toBe('new value')
  })

  test('should clear interval', async () => {
    const { unmount } = renderHook(() => useDebounce('test', 500))
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
