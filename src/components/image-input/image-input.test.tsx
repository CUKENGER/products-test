import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ImageInput } from '.'

const TestComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      images: [],
    },
  })
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const onSubmit: SubmitHandler<{ images: string[] }> = (data) => {
    console.log('data', data)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setImagePreviews(previews)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageInput
        register={register}
        errors={errors}
        imagePreviews={imagePreviews}
        onChange={handleImageChange}
      />
      <button type="submit" data-testid="ImageInput-ButtonTypeSubmit">
        Submit
      </button>
    </form>
  )
}

describe('image-input', () => {
  window.URL.createObjectURL = vi.fn()

  beforeEach(() => {
    render(<TestComponent />)
  })

  test('renders upload button', () => {
    const uploadButton = screen.getByRole('button', { name: /upload images/i })
    expect(uploadButton).toBeInTheDocument()
  })

  test('set value', async () => {
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
    fireEvent.change(input)

    expect(input.files).toHaveLength(1)
    expect(input.files![0]).toBe(file)
    expect(input.files![0].name).toBe('image.png')
    expect(input.files![0].type).toBe('image/png')
  })

  test('displays errors messages', async () => {
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(await screen.findByText(/required/i)).toBeInTheDocument()
  })

  test('displays image previews', async () => {
    const file = new File(['dummy content'], 'image.png', { type: 'image/png' })
    const input = await screen.findByTestId('images-input')

    if (!input) {
      throw test.fails('Input not found')
    }

    Object.defineProperty(input, 'files', {
      value: [file],
    })
    fireEvent.change(input)
    expect(await screen.findByText(/image preview/i)).toBeInTheDocument()
  })
})
