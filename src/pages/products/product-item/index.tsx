import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { CardHeader, CardMedia } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import { useProductStore } from '../../../store/product-store.ts'
import { Product } from '../../../types/product.ts'
import ProductContent from '../product-item-content/index.tsx'
import { useExpanded } from '../hooks/useExpanded.ts'

interface ProductItemProps {
  product: Product
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const navigate = useNavigate()

  const { setLikedProducts, removeProduct, likedProducts } = useProductStore()

  const { isExpanded, setIsExpanded, showMoreButton, textRef } = useExpanded(
    product.description
  )

  const handleExpandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setLikedProducts(product)
  }

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    removeProduct(product.id)
  }

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    navigate(`/products/${product.id}`)
  }

  const isLiked = likedProducts.some((p) => p.id === product.id)

  return (
    <Card className="flex flex-col h-full">
      <Card
        data-testid="Card-ProductItem"
        className="max-w-[345px] h-full flex flex-col cursor-pointer hover:bg-gray-50"
        onClick={handleNavigate}
      >
        <CardHeader
          title={product.title}
          className="flex items-center h-24"
          sx={{
            '& .MuiCardHeader-title': {
              fontSize: '20px',
            },
          }}
        />
        <CardMedia
          image={product.images[0]}
          className="object-cover w-full h-64"
        />
        <ProductContent
          description={product.description}
          expanded={isExpanded}
          descriptionRef={textRef}
          showMoreButton={showMoreButton}
          handleExpandClick={handleExpandClick}
        />
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleLikeClick}
            data-testid={
              isLiked ? 'FavoriteIcon-pressed' : 'FavoriteIcon-not-pressed'
            }
          >
            <FavoriteIcon color={isLiked ? 'error' : 'inherit'} />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Card>
  )
}
