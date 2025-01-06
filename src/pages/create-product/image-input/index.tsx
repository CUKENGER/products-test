import { Button, Typography } from "@mui/material"
import { HTMLAttributes } from "react"
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateProductDto } from "../../../types/product";

interface ImageInputProps extends HTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<CreateProductDto>;
  errors: FieldErrors<CreateProductDto>;
  imagePreviews: string[]
}

export const ImageInput = ({ register, errors, imagePreviews, onChange, ...props }: ImageInputProps) => {

  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*"
        {...register('images', {
          required: "Images are required",
          onChange: onChange
        })}
        className="hidden"
        id="images-input"
        {...props}
      />
      <label htmlFor="images-input">
        <Button variant="contained" color="primary" component="span">
          Upload Images
        </Button>
      </label>
      {errors.images && <Typography color="error">{errors.images.message}</Typography>}
      {imagePreviews.length > 0 && (
        <div className="mt-4">
          <Typography variant="h6">
            Image Preview:
          </Typography>
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