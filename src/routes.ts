import { CreateProduct } from './pages/create-product';
import { NotFound } from './pages/not-found';
import { Product } from './pages/product';
import { Products } from './pages/products';

export const routes = [
  { component: Products, path: '/', exact: true },
  { component: Product, path: 'products/:id', exact: true },
  { component: CreateProduct, path: 'products/create', exact: true },
  { component: NotFound, path: '*', exact: true },
];
