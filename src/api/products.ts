import axios from "axios"
import { Product } from "../types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products;
  } catch (e) {
    console.error(`error fetch products: ${e}`);
    throw e;
  }
};

export const fetchProduct = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  } catch (e) {
    console.error(`error fetch product: ${e}`);
    throw e;
  }
};
