import { act } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Product } from '../types/product'
import { ProductState, useProductStore } from './product-store'

const exampleProduct: Product = {
  id: 1,
  title: 'Example Product',
  price: 100,
  rating: 4.5,
  brand: 'Example Brand',
  category: 'Example Category',
  description: 'Example Description',
  images: ['example-image.jpg'],
}

type ProductStore = ProductState

describe.skip('product-store', () => {
  let store: ProductStore

  beforeEach(() => {
    store = useProductStore.getState()
  })

  test('should init with default values', () => {
    expect(store.products).toEqual([])
    expect(store.likedProducts).toEqual([])
    expect(store.isProductsLoaded).toEqual(false)
  })

  test('should add a product', () => {
    act(() => {
      store.addProduct(exampleProduct)
    })
    const updatedStore = useProductStore.getState()
    expect(updatedStore.products).toContainEqual(exampleProduct)
  })

  test('should remove a product', () => {
    act(() => {
      store.addProduct(exampleProduct)
      store.removeProduct(exampleProduct.id)
    })
    const updatedStore = useProductStore.getState()
    expect(updatedStore.products).not.toContainEqual(exampleProduct)
  })

  test('should set products', () => {
    const products: Product[] = [exampleProduct]
    act(() => {
      store.setProducts(products)
    })
    const updatedStore = useProductStore.getState()
    expect(updatedStore.products).toEqual(products)
  })

  test('should set liked products', () => {
    act(() => {
      store.setLikedProducts(exampleProduct)
    })
    const updatedStore = useProductStore.getState()
    expect(updatedStore.likedProducts).toContainEqual(exampleProduct)
  })

  test('should remove liked products', () => {
    act(() => {
      store.setLikedProducts(exampleProduct)
    })
    const updatedStore = useProductStore.getState()
    expect(updatedStore.likedProducts).not.toContainEqual(exampleProduct)
  })

  test('should set isProductsLoaded', () => {
    act(() => {
      store.setIsProductsLoaded(true)
    })
    const updatedStore = useProductStore.getState()
    expect(updatedStore.isProductsLoaded).toBe(true)
  })

  test('should edit a product', () => {
    const updatedProduct: Partial<Product> = { title: 'Updated Product' }
    act(() => {
      store.addProduct(exampleProduct)
      store.setEditProduct(exampleProduct.id, updatedProduct)
    })
    const updatedStore = useProductStore.getState()
    expect(updatedStore.products[0].title).toBe('Updated Product')
  })
})
