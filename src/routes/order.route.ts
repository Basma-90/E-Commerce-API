import express from 'express';
import * as orderController from '../controllers/order.controller';
import validate from '../middlewares/validateResource';
import {requireUser } from '../middlewares/auth.middleware';
import * as orderSchema from "../schemas/order.schema";

const orderRouter=express.Router();

orderRouter.post('/api/orders', [requireUser,validate(orderSchema.createOrderSchema)], orderController.createOrder);
orderRouter.get('/api/orders/:id', requireUser, orderController.getOrder);
orderRouter.put('/api/orders/:id', [requireUser,validate(orderSchema.updateOrderSchema)], orderController.updateOrder);
orderRouter.delete('/api/orders/:id', requireUser, orderController.deleteOrder);
orderRouter.get('/api/orders', requireUser, orderController.getOrders);
orderRouter.get('/api/orders/user/:userId', requireUser, orderController.getOrdersByUser);
orderRouter.get('/api/orders/status/:status', requireUser, orderController.getOrdersByStatus);

export default orderRouter;
