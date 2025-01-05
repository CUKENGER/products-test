import { create } from "zustand";
import { Product } from "../types/product";

interface ProductState {
  products: Product[];
  likedProducts: Product[];
  setLikedProducts: (product: Product) => void;
  setProducts: (products: Product[]) => void;
  removeProduct: (productId: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  likedProducts: [],
  setLikedProducts: (product) => set((state) => ({
  likedProducts: state.likedProducts.includes(product)
      ? state.likedProducts.filter((p) => p.id !== product.id)
      : [...state.likedProducts, product]
  })),
  setProducts: (products) => set(() => ({ products })),
  removeProduct: (productId) => set((state) => ({
    products: state.products.filter((product) => product.id !== productId)
  }))
}));