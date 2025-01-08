import { Product } from '../types/product';

export const filterProducts = (
  products: Product[],
  filter: string,
  likedProducts: Product[]
) => {
  switch (filter) {
    case 'liked':
      return likedProducts;
    case 'popular':
      return [...products].sort((a, b) => b.rating - a.rating);
    case 'cheap':
      return [...products].sort((a, b) => a.price - b.price);
    case 'expensive':
      return [...products].sort((a, b) => b.price - a.price);
    default:
      return products;
  }
};
