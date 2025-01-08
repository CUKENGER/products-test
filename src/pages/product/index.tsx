import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProduct } from '../../api/products'
import { Product as ProductType } from '../../types/product'
import { ProductSkeleton } from './product-skeleton'

export const Product = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductType>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getProduct = async (id: number) => {
      try {
        const data = await fetchProduct(id)
        setProduct(data)
      } catch (e) {
        console.error('Failed get product:', e)
      } finally {
        setIsLoading(false)
      }
    }

    getProduct(Number(id))
  }, [id])
  
  if(isLoading) {
    return <ProductSkeleton/>
  }

  if (!product) {
    return <div>Product not found</div>
  }


  return (
    <Card className="flex flex-col w-full max-w-4xl p-4 mx-auto mt-4 md:flex-row">
      <CardMedia
        component="img"
        image={product.images[0]}
        alt={product.title}
        className="object-cover w-full h-auto md:w-1/2 md:h-96"
      />
      <CardContent className="flex flex-col gap-3 md:ml-4">
        <Typography gutterBottom variant="h4" className="text-2xl md:text-3xl">
          {product.title}
        </Typography>
        <Typography variant="h5" className="text-xl md:text-2xl">
          Brand: {product.brand}
        </Typography>
        <Typography variant="body2" className="text-base md:text-lg">
          Category: {product.category}
        </Typography>
        <Typography variant="body2" className="text-base md:text-lg">
          {product.description}
        </Typography>
        <Chip className="mt-2 w-min" label={`$${product.price.toFixed(2)}`} />
        <Chip
          className="mt-2 w-min"
          label={`Rating: ${product.rating.toFixed(1)}`}
        />
        <Link to={'edit'}>
          <Button variant="contained" color="primary" className="mt-4">
            Изменить
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
