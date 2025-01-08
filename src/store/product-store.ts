import { create } from 'zustand'
import { Product } from '../types/product'

interface ProductState {
  products: Product[]
  likedProducts: Product[]
  isProductsLoaded: boolean
  setLikedProducts: (product: Product) => void
  setProducts: (products: Product[]) => void
  removeProduct: (productId: number | string) => void
  addProduct: (product: Product) => void
  setIsProductsLoaded: (loaded: boolean) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  likedProducts: [],
  isProductsLoaded: false,
  setLikedProducts: (product) =>
    set((state) => ({
      likedProducts: state.likedProducts.includes(product)
        ? state.likedProducts.filter((p) => p.id !== product.id)
        : [...state.likedProducts, product],
    })),
  setProducts: (products) => set(() => ({ products })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  setIsProductsLoaded: (loaded) => set({ isProductsLoaded: loaded }),
}))
