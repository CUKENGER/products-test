import { act, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Mock, vi } from 'vitest'
import { Product } from '.'
import { fetchProduct } from '../../api/products'

vi.mock('../../api/products', () => ({
  fetchProduct: vi.fn(),
}))

describe.skip('Product Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    brand: 'Test Brand',
    category: 'Test Category',
    description: 'This is a test product.',
    price: 99.99,
    rating: 4.5,
    images: ['https://example.com/image.jpg'],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders loading state', async () => {
    ;(fetchProduct as Mock).mockImplementationOnce(() => new Promise(() => {}))

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/product/1']}>
          <Product />
        </MemoryRouter>
      )
    })

    expect(screen.getByTestId(/product-page-loader/i)).toBeInTheDocument()
  })

  test('renders product details after fetching', async () => {
    ;(fetchProduct as Mock).mockResolvedValueOnce(mockProduct)

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/product/1']}>
          <Product />
        </MemoryRouter>
      )
    })

    await waitFor(() =>
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    )

    expect(screen.getByText(`Brand: ${mockProduct.brand}`)).toBeInTheDocument()
    expect(
      screen.getByText(`Category: ${mockProduct.category}`)
    ).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument()
    expect(
      screen.getByText(`Rating: ${mockProduct.rating.toFixed(1)}`)
    ).toBeInTheDocument()
  })

  test('renders "Product not found" when product does not exist', async () => {
    ;(fetchProduct as Mock).mockRejectedValueOnce(new Error('Not Found'))

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/product/1']}>
          <Product />
        </MemoryRouter>
      )
    })

    await waitFor(() =>
      expect(screen.getByText(/product not found/i)).toBeInTheDocument()
    )
  })
})
