import { Button, Typography } from '@mui/material'
import { HTMLAttributes } from 'react'
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form'

interface ImageInputProps<T extends FieldValues>
  extends HTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  imagePreviews: string[]
  required?: boolean
}

export const ImageInput = <T extends FieldValues>({
  register,
  errors,
  imagePreviews,
  onChange,
  required = true,
  ...props
}: ImageInputProps<T>) => {
  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*"
        {...register('images' as Path<T>, {
          required: required ? 'This field is required' : false,
          onChange: onChange,
        })}
        className="hidden"
        id="images-input"
        data-testid="images-input"
        {...props}
      />
      <label htmlFor="images-input" data-testid="upload-btn">
        <Button variant="contained" color="primary" component="span">
          Upload Images
        </Button>
      </label>
      {errors.images && typeof errors.images.message === 'string' && (
        <Typography color="error">{errors.images.message}</Typography>
      )}
      {imagePreviews.length > 0 && (
        <div className="mt-4">
          <Typography variant="h6">Image Preview:</Typography>
          <div className="flex flex-wrap">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="w-40 h-40 m-2 ml-0 overflow-hidden">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
