import express from 'express';
import * as productController from '../controllers/product.controller';
import * as productSchema from "../schemas/product.schema";
import validate from '../middlewares/validateResource';
import {requireUser } from '../middlewares/auth.middleware';

const productRouter = express.Router();

productRouter.post('/api/products', [requireUser,validate(productSchema.createProductSchema)], productController.createProduct);
productRouter.get('/api/products/:id', requireUser, productController.findProduct);
productRouter.put('/api/products/:id', [requireUser,validate(productSchema.updateProductSchema)], productController.updateProduct);
productRouter.delete('/api/products/:id', requireUser, productController.deleteProduct);
productRouter.get('/api/products', requireUser, productController.listProducts);

export default productRouter;