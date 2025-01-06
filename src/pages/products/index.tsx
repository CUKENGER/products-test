import { Button, ButtonGroup, Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../api/products";
import { filters } from "../../consts/filters";
import { useProductStore } from "../../store/product-store";
import { filterProducts } from "../../utils/filterProducts";
import { ProductItem } from "./product-item/index";
import ProductItemSkeleton from "./product-item-skeleton";

export const Products = () => {

  const { setProducts, products, likedProducts, isProductsLoaded, setIsProductsLoaded } = useProductStore()
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      if (isProductsLoaded) {
        setIsLoading(false)
        return
      }
      try {
        const data = await fetchProducts();
        setProducts(data ?? []);
        setIsProductsLoaded(true)
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false)
      }
    };

    getProducts();
  }, [isProductsLoaded, setIsProductsLoaded, setProducts]);

  const filteredProducts = filterProducts(products, filter, likedProducts);

  return (
    <Container sx={{ mt: 2 }}>
      <div className="flex items-center justify-between mb-2">
        <ButtonGroup aria-label="filter buttons" sx={{ mb: 2 }}>
          {filters.map(({ label, value }) => (
            <Button
              key={value}
              onClick={() => setFilter(value)}
              variant={filter === value ? "contained" : "outlined"}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
        <Link to={'products/create'}>
          <Button variant="contained">
            Add
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <Grid2 container spacing={0.5}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <ProductItemSkeleton />
            </Grid2>
          ))}
        </Grid2>
      ) : filter === "liked" && likedProducts.length === 0 ? (
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', mt: 2 }}>
          Добавьте в избранное, чтобы увидеть здесь товары
        </Typography>
      ) : (
        <Grid2 container spacing={0.5}>
          {filteredProducts.map((product) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <ProductItem product={product} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Container>
  )
}