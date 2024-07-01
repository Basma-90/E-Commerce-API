import {requireUser } from '../middlewares/auth.middleware';
import express from 'express';
import * as orderController from '../controllers/order.controller';
const statRouter = express.Router();

statRouter.get('/api/orders/count', requireUser, orderController.orderCountController);


statRouter.get('/api/orders/sales', requireUser, orderController.totalSalesController);
export default statRouter;