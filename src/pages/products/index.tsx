import { Button, ButtonGroup, Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/get-products";
import { ProductItem } from "../../components/product-item/index";
import { useProductStore } from "../../store/product-store";
import { filterProducts } from "../../utils/filterProducts";

const filters = [
  { label: "Все", value: "all" },
  { label: "Популярные", value: "popular" },
  { label: "Дешевле", value: "cheap" },
  { label: "Дороже", value: "expensive"},
  { label: "Избранные", value: "liked" },
]

export const Products = () => {

  const { setProducts, products, likedProducts } = useProductStore()
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data ?? []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    getProducts();
  }, [setProducts]);

  const filteredProducts = filterProducts(products, filter, likedProducts);

  return (
    <Container sx={{ mt: 2 }}>
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
      {filter === "liked" && likedProducts.length === 0 ? (
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