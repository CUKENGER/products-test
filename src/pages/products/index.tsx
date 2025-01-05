import { Button, ButtonGroup, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/get-products";
import { ProductItem } from "../../components/product-item/index";
import { useProductStore } from "../../store/product-store";
import { useSearchStore } from "../../store/search-store";

export const Products = () => {

  const { setProducts, products, likedProducts } = useProductStore()
  const { query } = useSearchStore()
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

  const filteredProducts = filter === "liked" ? likedProducts : products;

  const searchFilteredProducts = query
    ? filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    : filteredProducts;

  return (
    <Container sx={{ mt: 2 }}>
      <ButtonGroup aria-label="filter buttons" sx={{ mb: 2 }}>
        <Button onClick={() => setFilter("all")} variant={filter === "all" ? "contained" : "outlined"}>
          Все
        </Button>
        <Button onClick={() => setFilter("liked")} variant={filter === "liked" ? "contained" : "outlined"}>
          Избранные
        </Button>
      </ButtonGroup>
      {filter === "liked" && likedProducts.length === 0 ? (
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', mt: 2 }}>
          Добавьте в избранное, чтобы увидеть здесь товары
        </Typography>
      ) : searchFilteredProducts.length === 0 ? (
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', mt: 2 }}>
          Ничего не найдено
        </Typography>
      ) : (
          <Grid container spacing={2}>
            {searchFilteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>
        )}
    </Container>
  )
}