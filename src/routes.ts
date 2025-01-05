import { CreateProduct } from "./pages/create-product";
import { Home } from "./pages/home";
import { NotFound } from "./pages/not-found";
import { Product } from "./pages/product";
import { Products } from "./pages/products";

export const routes = [
  {component: Home, path: '', exact: true },
  {component: Products, path: 'products', exact: true },
  {component: Product, path: 'products/:id', exact: true },
  {component: CreateProduct, path: 'products/create', exact: true },
  {component: NotFound, path: '*', exact: true },
]