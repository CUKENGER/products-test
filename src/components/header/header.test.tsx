import { Header } from '.'
import { expect, test, describe, vi } from 'vitest'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { waitFor } from '@testing-library/react'

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

describe.skip('Header component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
  })

  test('renders Header component with "Home" and "Search"', () => {
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })

  test('updates search query and shows results', async () => {
    const input = screen.getByLabelText('Search')
    await userEvent.type(input, 'Product 1')

    expect(input).toHaveValue('Product 1')
    waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
    })
  })

  test('hides search results when input is cleared', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const input = screen.getByLabelText('Search')
    await userEvent.type(input, 'Product')
    await userEvent.clear(input)

    expect(input).toHaveValue('')
    await waitFor(() => {
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument()
    })
  })

  test('navigates to Home when "Home" button is clicked', () => {
    const homeLink = screen.getByRole('link', { name: /home/i }) //
    fireEvent.click(homeLink)

    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  test('does not show results when no match is found', async () => {
    const input = screen.getByLabelText('Search')
    await userEvent.type(input, 'Nonexistent Product')

    expect(input).toHaveValue('Nonexistent Product')
    await waitFor(() => {
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Product 2')).not.toBeInTheDocument()
    })
  })
})
