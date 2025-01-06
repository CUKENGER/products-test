import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardHeader, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../../store/product-store.ts";
import { Product } from "../../../types/product.ts";
import ProductContent from "../product-item-content/index.tsx";

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const navigate = useNavigate();

  const { setLikedProducts, removeProduct, likedProducts } = useProductStore();
  const [expanded, setExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const isOverflowing =
        descriptionRef.current.scrollHeight >
        descriptionRef.current.clientHeight;
      setShowMoreButton(isOverflowing);
    }
  }, [product.description]);

  const handleExpandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLikedProducts(product);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeProduct(product.id);
  };

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    navigate(`/products/${product.id}`);
  }

  const isLiked = likedProducts.some((p) => p.id === product.id);

  return (
    <Card className="flex flex-col h-full">
      <Card
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
        <CardMedia image={product.images[0]} className="object-cover w-full h-64" />
        <ProductContent
          description={product.description}
          expanded={expanded}
          descriptionRef={descriptionRef}
          showMoreButton={showMoreButton}
          handleExpandClick={handleExpandClick}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
            <FavoriteIcon color={isLiked ? "error" : "inherit"} />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Card>
  );
};
