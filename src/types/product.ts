export type ProductBase = {
  title: string
  description: string
  brand: string
  category: string
  price: number
  rating: number
}

export type Product = ProductBase & {
  id: number | string
  images: string[]
}

export type CreateProductDto = ProductBase & {
  images: FileList
}

export type EditProductDto = ProductBase & {
  images: FileList | string[]
}
