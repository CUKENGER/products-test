import { useEffect, useState } from 'react'

export const useGetProducts = <T>(
  getProducts: (limit: number, skip: number) => Promise<T[]>,
  setProducts: (data: T[]) => void,
  setIsProductsLoaded: (isLoaded: boolean) => void,
  isProductsLoaded: boolean,
  limit: number,
  skip: number
) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const get = async () => {
      if (isProductsLoaded) {
        setIsLoading(false)
        return
      }
      try {
        const newData = await getProducts(limit, skip)
        setProducts(newData)
        setIsProductsLoaded(true)
      } catch (e) {
        console.error('Error get data:', e)
      } finally {
        setIsLoading(false)
      }
    }

    get()
  }, [
    getProducts,
    isProductsLoaded,
    setProducts,
    setIsProductsLoaded,
    limit,
    skip,
  ])

  return {
    isLoading,
  }
}
