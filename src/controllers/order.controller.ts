import { Request, Response } from 'express';
import {
    createOrderService,
    updateOrderService,
    deleteOrderService,
    getOrderService,
    getOrdersService,
    getOrdersByUserService,
    getOrdersByStatusService
} from '../services/order.services';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderInput = req.body;
        const newOrder = await createOrderService(orderInput);
        res.status(201).json(newOrder);
    } catch (error: any) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: error.message });
    }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const updatedOrder = await updateOrderService(orderId, status);
        res.status(200).json(updatedOrder);
    } catch (error: any) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = req.params.id;
        await deleteOrderService(orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = req.params.id;
        const order = await getOrderService(orderId);
        res.status(200).json(order);
    } catch (error: any) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await getOrdersService();
        res.status(200).json(orders);
    } catch (error: any) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getOrdersByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;
        const orders = await getOrdersByUserService(userId);
        res.status(200).json(orders);
    } catch (error: any) {
        console.error('Error fetching orders by user:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getOrdersByStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = req.params.status as unknown as string;
        const orders = await getOrdersByStatusService(status);
        res.status(200).json(orders);
    } catch (error: any) {
        console.error('Error fetching orders by status:', error);
        res.status(500).json({ error: error.message });
    }
};

