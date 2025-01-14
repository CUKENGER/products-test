import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, vi } from 'vitest'
import { ProductItem } from '.'
import { Product } from '../../../types/product'
import { useProductStore } from '../../../store/product-store'
import userEvent from '@testing-library/user-event'

vi.mock('../../../store/product-store', () => ({
  useProductStore: vi.fn(),
}))

const mockSetLikedProduct = vi.fn()
const mockRemoveProduct = vi.fn()
const mockUseProductStore = {
  products: [],
  likedProducts: [],
  setLikedProducts: mockSetLikedProduct,
  removeProduct: mockRemoveProduct,
}

const mockedUseNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const mod =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  }
})

describe.skip('product item component', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Product Title 1',
    price: 100,
    rating: 4.5,
    brand: 'Product Brand 1',
    category: 'Product Category 1',
    description: 'This is mock product',
    images: ['https://example.com/image.jpg'],
  }

  beforeEach(() => {
    vi.mocked(useProductStore).mockReturnValue(mockUseProductStore)
    mockSetLikedProduct.mockClear()
    mockRemoveProduct.mockClear()
  })

  it('renders product details correctly', () => {
    render(<ProductItem product={mockProduct} />)

    expect(screen.getByText('Product Title 1')).toBeInTheDocument()
    expect(screen.getByText('This is mock product')).toBeInTheDocument()
  })

  it('handle like button click', async () => {
    render(<ProductItem product={mockProduct} />)

    fireEvent.click(screen.getByLabelText('add to favorites'))
    expect(mockSetLikedProduct).toHaveBeenCalledWith(mockProduct)
  })

  it('handle delete button click', async () => {
    render(<ProductItem product={mockProduct} />)

    const deleteButton = screen.getByLabelText('delete')
    await userEvent.click(deleteButton)

    expect(mockRemoveProduct).toHaveBeenCalledWith(mockProduct.id)
  })

  it('navigates to product page on click', async () => {
    render(<ProductItem product={mockProduct} />)

    const productCard = screen.getByTestId('Card-ProductItem')
    await userEvent.click(productCard)
    expect(mockedUseNavigate).toHaveBeenCalledWith(
      `/products/${mockProduct.id}`
    )
  })
})
