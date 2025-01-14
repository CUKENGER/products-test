import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
import { CreateProduct } from '.'
import userEvent from '@testing-library/user-event'

const mockAddProduct = vi.fn()
vi.mock('../../store/product-store.ts', () => ({
  useProductStore: vi.fn(() => ({
    addProduct: mockAddProduct,
  })),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const mod =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...mod,
    useNavigate: () => mockNavigate,
  }
})
describe('create-product', () => {
  window.URL.createObjectURL = vi.fn()

  beforeEach(() => {
    render(
      <MemoryRouter>
        <CreateProduct />
      </MemoryRouter>
    )
  })

  test('render form', () => {
    expect(screen.getByTestId('typography')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('Price')).toBeInTheDocument()
    expect(screen.getByLabelText('Brand')).toBeInTheDocument()
    expect(screen.getByLabelText('Category')).toBeInTheDocument()
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument()
  })

  test('validates form fields', async () => {
    fireEvent.click(screen.getByTestId('submit-btn'))
    expect(await screen.findByText('Title is required')).toBeInTheDocument()
    expect(
      await screen.findByText('Description is required')
    ).toBeInTheDocument()
    expect(await screen.findByText('Price is required')).toBeInTheDocument()
    expect(await screen.findByText('Brand is required')).toBeInTheDocument()
    expect(await screen.findByText('Category is required')).toBeInTheDocument()
  })

  it('calls addProduct and navigate on successfull path', async () => {
    const titleInput = screen.getByLabelText('Title')
    const descriptionInput = screen.getByLabelText('Description')
    const priceInput = screen.getByLabelText('Price')
    const brandInput = screen.getByLabelText('Brand')
    const categoryInput = screen.getByLabelText('Category')
    const submitButton = screen.getByTestId('submit-btn')

    const file = new File(['dummy content'], 'image.png', { type: 'image/png' })
    const input = (await screen.findByTestId(
      'images-input'
    )) as HTMLInputElement

    if (!input) {
      throw test.fails('Input not found')
    }

    Object.defineProperty(input, 'files', {
      value: [file],
    })
    await waitFor(() => {
      fireEvent.change(input)
      expect(input.files).toHaveLength(1)
      expect(input.files![0]).toBe(file)
      expect(input.files![0].name).toBe('image.png')
      expect(input.files![0].type).toBe('image/png')
    })

    await userEvent.type(titleInput, 'Test Product')
    await userEvent.type(descriptionInput, 'This is a test description')
    await userEvent.type(priceInput, '50')
    await userEvent.type(brandInput, 'Test Brand')
    await userEvent.type(categoryInput, 'Test Category')

    fireEvent.click(submitButton)
  })
})
