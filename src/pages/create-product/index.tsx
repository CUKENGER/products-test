import { SubmitHandler, useForm } from "react-hook-form"
import { useProductStore } from "../../store/product-store"
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ImageInput } from "../../components/image-input";
import { useNavigate } from "react-router-dom";

export interface IFormInput {
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  rating: number;
  images: FileList;
}

export const CreateProduct = () => {

  const { addProduct } = useProductStore()
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<IFormInput>()

  const navigate = useNavigate()

  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const previews = Array.from(files).map((file) => URL.createObjectURL(file))
      setImagePreviews(previews)
    }
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const newProduct = {
      id: crypto.randomUUID(),
      ...data,
      images: Array.from(data.images).map((file) => URL.createObjectURL(file))
    }
    addProduct(newProduct)
    navigate('/')
  }

  return (
    <Container maxWidth="sm" className="pb-10 mt-12">
      <Typography variant="h4" gutterBottom>
        Create Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageInput
          register={register}
          errors={errors}
          imagePreviews={imagePreviews}
          onChange={handleImageChange}
        />
        <TextField
          label="Title"
          {...register(
            "title",
            {
              required: "Title is required",
              validate: (value) => value.trim() !== "" || "Title is required"
            })
          }
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          margin='normal'
        />
        <TextField
          label="Description"
          {...register("description", { required: "Description is required", validate: (value) => value.trim() !== "" || "Title is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          margin='normal'
          multiline
          rows={4}
        />
        <TextField
          label='Price'
          type="number"
          {...register('price', { required: "Price is required", min: { value: 0, message: "Price must be greater than 0" } })}
          error={!!errors.price}
          helperText={errors.price?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Brand"
          {...register('brand', { required: "Brand is required", validate: (value) => value.trim() !== "" || "Brand is required" })}
          error={!!errors.brand}
          helperText={errors.brand?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label='Category'
          {...register('category', { required: "Category is required", validate: (value) => value.trim() !== "" || "Category is required" })}
          error={!!errors.category}
          helperText={errors.category?.message}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Product
        </Button>
      </form>
    </Container>
  )
}