import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Mock, vi } from 'vitest'
import { Products } from '.'
import { useProductStore } from '../../store/product-store'
import { useGetProducts } from './hooks/useGetProducts'

vi.mock('../../api/products')
vi.mock('../products/hooks/useGetProducts.ts')
vi.mock('../../store/product-store', () => ({
  useProductStore: vi.fn(),
}))

describe.skip('Products page', () => {
  const mockProducts = [
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
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useProductStore as unknown as Mock).mockReturnValue({
      products: mockProducts,
      likedProducts: [],
      isLoading: false,
    })
  })

  test('renders loading state', async () => {
    ;(useGetProducts as Mock).mockReturnValue({
      isLoading: true,
    })

    await act(async () => {
      render(
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      )
    })

    const loadingElements = screen.getAllByText(/loading/i)
    expect(loadingElements).toHaveLength(12) // Adjust the number based on your actual implementation
  })

  test('renders products after loading', async () => {
    ;(useGetProducts as Mock).mockReturnValue({
      isLoading: false,
    })

    await act(async () => {
      render(
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      )
    })

    await waitFor(() =>
      expect(screen.getByText('Product 1')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(screen.getByText('Product 2')).toBeInTheDocument()
    )
  })

  test('shows message when no liked products', async () => {
    ;(useProductStore as unknown as Mock).mockReturnValue({
      products: [],
      likedProducts: [],
      isLoading: false,
    })

    await act(async () => {
      render(
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      )
    })

    const filterButton = screen.getByRole('button', { name: /избранные/i })
    fireEvent.click(filterButton)

    await waitFor(() =>
      expect(screen.getByText(/добавьте в избранное/i)).toBeInTheDocument()
    )
  })
})
