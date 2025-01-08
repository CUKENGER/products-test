export type Product = {
  id: number | string
  title: string
  description: string
  images: string[]
  brand: string
  category: string
  price: number
  rating: number
}

export type CreateProductDto = {
  title: string
  description: string
  price: number
  brand: string
  category: string
  rating: number
  images: FileList
}
