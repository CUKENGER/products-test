import { describe, test, vi } from 'vitest'
import { SearchResults } from '.'
import { Product } from '../../types/product'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const mockedUseNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const mod =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  }
})

describe.skip('search result', () => {
  const products: Product[] = [
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
  const onClose = vi.fn()

  beforeEach(() => {
    render(
      <MemoryRouter>
        <SearchResults onClose={onClose} results={products} />
      </MemoryRouter>
    )
  })

  test('render', () => {
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
    expect(screen.getByText('Product 3')).toBeInTheDocument()
    expect(screen.getByTestId('search-results')).toBeInTheDocument()
  })

  test('calls onClose function', () => {
    fireEvent.click(screen.getByText('Product 1'))
    expect(onClose).toHaveBeenCalled()
  })

  test('navigate on click', () => {
    fireEvent.click(screen.getByText('Product 1'))
    expect(onClose).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenCalledWith('products/1')
  })
})
