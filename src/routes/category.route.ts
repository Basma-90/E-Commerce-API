import express from 'express';
import * as categoryController from '../controllers/category.controller';
import * as categorySchema from "../schemas/category.schema";
import validate from '../middlewares/validateResource';
import {requireUser } from '../middlewares/auth.middleware';

const categoryRouter = express.Router();

categoryRouter.post('/api/categories', [requireUser,validate(categorySchema.createCategorySchema)], categoryController.createCategory);
categoryRouter.get('/api/categories/:id', requireUser, categoryController.findCategory);
categoryRouter.put('/api/categories/:id', [requireUser,validate(categorySchema.updateCategorySchema)], categoryController.updateCategory);
categoryRouter.delete('/api/categories/:id', requireUser, categoryController.deleteCategory);
categoryRouter.get('/api/categories', requireUser, categoryController.getCategories);


export default categoryRouter;