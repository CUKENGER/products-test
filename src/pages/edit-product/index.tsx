import { Button, Container, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProduct } from '../../api/products'
import { ImageInput } from '../../components/image-input'
import { useProductStore } from '../../store/product-store'
import { EditProductDto, Product as ProductType } from '../../types/product'

export const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [oldProduct, setOldProduct] = useState<ProductType>()
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const { setEditProduct } = useProductStore()

  useEffect(() => {
    const getProduct = async (id: number) => {
      const data = await fetchProduct(id)
      setOldProduct(data)
      setImagePreviews(data.images)
    }

    getProduct(Number(id))
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProductDto>({
    defaultValues: {
      brand: oldProduct?.brand,
      category: oldProduct?.category,
      description: oldProduct?.description,
      images: oldProduct?.images,
      price: oldProduct?.price,
      rating: oldProduct?.rating,
      title: oldProduct?.title,
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setImagePreviews(previews)
    }
  }

  const onSubmit: SubmitHandler<EditProductDto> = (data) => {
    const updatedProduct = {
      ...data,
      images:
        data.images.length > 0 && data.images instanceof FileList
          ? Array.from(data.images).map((file) => URL.createObjectURL(file))
          : oldProduct?.images,
    }
    setEditProduct(Number(id), updatedProduct)
    navigate(`/`)
  }

  if (!oldProduct) {
    return <div>Product not found</div>
  }

  return (
    <Container maxWidth="sm" className="pb-10 mt-12">
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageInput
          register={register}
          errors={errors}
          imagePreviews={imagePreviews}
          onChange={handleImageChange}
          required={false}
        />
        <TextField
          label="Title"
          {...register('title', {
            required: 'Title is required',
            value: oldProduct.title,
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          {...register('description', {
            required: 'Description is required',
            value: oldProduct.description,
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Price"
          type="number"
          {...register('price', {
            value: Number(oldProduct.price.toFixed()),
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Brand"
          {...register('brand', {
            required: 'Brand is required',
            value: oldProduct.brand,
          })}
          error={!!errors.brand}
          helperText={errors.brand?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          {...register('category', {
            required: 'Category is required',
            value: oldProduct.category,
          })}
          error={!!errors.category}
          helperText={errors.category?.message}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Edit
        </Button>
      </form>
    </Container>
  )
}
