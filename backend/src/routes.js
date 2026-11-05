import { Router } from 'express';
import multer from 'multer';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductController from './app/controllers/ProductsController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import adminMiddlewar from './app/middlewares/admin.js';
import authMiddlewar from './app/middlewares/auth.js';
import multerConfig from './config/multer.cjs';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewar);
routes.get('/users', UserController.index);
routes.post(
  '/products',
  adminMiddlewar,
  upload.single('file'),
  ProductController.store,
);
routes.put(
  '/products/:id',
  adminMiddlewar,
  upload.single('file'),
  ProductController.update,
);
routes.get('/products', adminMiddlewar, ProductController.index);

routes.post(
  '/categories',
  adminMiddlewar,
  upload.single('file'),
  CategoryController.store,
);
routes.get('/categories', adminMiddlewar, CategoryController.index);
routes.put(
  '/categories/:id',
  adminMiddlewar,
  upload.single('file'),
  CategoryController.update,
);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', adminMiddlewar, OrderController.update);

export default routes;

// senhas usuarios:
// Maria/Pedro: 123456
