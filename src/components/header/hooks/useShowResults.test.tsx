import { render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
import { Header } from '../index'
import { useShowResults } from './useShowResults'

vi.mock('../../store/product-store', () => ({
  useProductStore: () => ({
    products: [
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        rating: 4.5,
        brand: 'brand 1',
        category: 'category 1',
        description: 'desc 1',
        images: ['images 1'],
      },
      {
        id: 2,
        title: 'Product 2',
        price: 200,
        rating: 4.0,
        brand: 'brand 2',
        category: 'category 2',
        description: 'desc 2',
        images: ['images 2'],
      },
      {
        id: 3,
        title: 'Product 3',
        price: 300,
        rating: 4.8,
        brand: 'brand 3',
        category: 'category 3',
        description: 'desc 3',
        images: ['images 3'],
      },
    ],
  }),
}))

describe.skip('useShowResults', () => {
  test('init with false', () => {
    const { result } = renderHook(() => useShowResults())
    expect(result.current.isShowResults).toBe(false)
  })

  test('should be true when call set', () => {
    const { result } = renderHook(() => useShowResults())

    act(() => {
      result.current.setIsShowResults(true)
    })

    expect(result.current.isShowResults).toBe(true)
  })

  test('should be false when click outside', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const input = screen.getByLabelText('Search')
    await userEvent.type(input, 'Product')

    const clickEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    })

    const outsideElement = document.createElement('div')

    outsideElement.style.width = '100px'
    outsideElement.style.height = '100px'
    outsideElement.style.position = 'absolute'
    outsideElement.style.top = '0'
    outsideElement.style.left = '0'

    document.body.appendChild(outsideElement)

    act(() => {
      outsideElement.dispatchEvent(clickEvent)
    })

    await waitFor(() => {
      expect(screen.queryByText('Product')).not.toBeInTheDocument()
    })

    document.body.removeChild(outsideElement)
  })
})
