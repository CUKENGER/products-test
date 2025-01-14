import { describe } from 'vitest'
import { Product } from '../types/product'
import { filterProducts } from './filterProducts'

describe.skip('filterProducts', () => {
  const products: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      rating: 4.5,
      brand: 'brand 1',
      category: 'category 1',
      description: 'desc 1',
      images: ['images 1'],
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      rating: 4.0,
      brand: 'brand 2',
      category: 'category 2',
      description: 'desc 2',
      images: ['images 2'],
    },
    {
      id: 3,
      title: 'Product 3',
      price: 300,
      rating: 4.8,
      brand: 'brand 3',
      category: 'category 3',
      description: 'desc 3',
      images: ['images 3'],
    },
  ]

  const likedProducts: Product[] = [
    {
      id: 2,
      title: 'Product 2',
      price: 300,
      rating: 4.8,
      brand: 'brand 3',
      category: 'category 3',
      description: 'desc 3',
      images: ['images 3'],
    },
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      rating: 4.5,
      brand: 'brand 1',
      category: 'category 1',
      description: 'desc 1',
      images: ['images 1'],
    },
  ]

  it('filter is liked', () => {
    const result = filterProducts(products, 'liked', likedProducts)
    expect(result).toEqual(likedProducts)
  })

  it('filter is popular', () => {
    const result = filterProducts(products, 'popular', likedProducts)
    expect(result).toEqual([
      {
        id: 3,
        title: 'Product 3',
        price: 300,
        rating: 4.8,
        brand: 'brand 3',
        category: 'category 3',
        description: 'desc 3',
        images: ['images 3'],
      },
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        rating: 4.5,
        brand: 'brand 1',
        category: 'category 1',
        description: 'desc 1',
        images: ['images 1'],
      },
      {
        id: 2,
        title: 'Product 2',
        price: 200,
        rating: 4.0,
        brand: 'brand 2',
        category: 'category 2',
        description: 'desc 2',
        images: ['images 2'],
      },
    ])
  })

  it('filter is cheap', () => {
    const result = filterProducts(products, 'cheap', likedProducts)
    expect(result).toEqual([
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        rating: 4.5,
        brand: 'brand 1',
        category: 'category 1',
        description: 'desc 1',
        images: ['images 1'],
      },
      {
        id: 2,
        title: 'Product 2',
        price: 200,
        rating: 4.0,
        brand: 'brand 2',
        category: 'category 2',
        description: 'desc 2',
        images: ['images 2'],
      },
      {
        id: 3,
        title: 'Product 3',
        price: 300,
        rating: 4.8,
        brand: 'brand 3',
        category: 'category 3',
        description: 'desc 3',
        images: ['images 3'],
      },
    ])
  })

  it('filter is expensive', () => {
    const result = filterProducts(products, 'expensive', likedProducts)
    expect(result).toEqual([
      {
        id: 3,
        title: 'Product 3',
        price: 300,
        rating: 4.8,
        brand: 'brand 3',
        category: 'category 3',
        description: 'desc 3',
        images: ['images 3'],
      },
      {
        id: 2,
        title: 'Product 2',
        price: 200,
        rating: 4.0,
        brand: 'brand 2',
        category: 'category 2',
        description: 'desc 2',
        images: ['images 2'],
      },
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        rating: 4.5,
        brand: 'brand 1',
        category: 'category 1',
        description: 'desc 1',
        images: ['images 1'],
      },
    ])
  })

  it('no filter', () => {
    const result = filterProducts(products, 'unknown', likedProducts)
    expect(result).toEqual(products)
  })
})
