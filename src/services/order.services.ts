import { IProduct } from '../models/product.model';
import Order from '../models/order.model';
import OrderItem from '../models/orderItem.model';

export const createOrderService = async (orderInput: any) => {
    try {
        const orderItemsIds = await Promise.all(orderInput.orderItems.map(async (item: any) => {
            const newOrderItem = new OrderItem({ product: item.product, quantity: item.quantity });
            await newOrderItem.save();
            return newOrderItem._id;
        }));

        const totalPrices = await Promise.all(orderItemsIds.map(async (id) => {
            const orderItem = await OrderItem.findById(id).populate('product', 'price');
            const product = orderItem?.product as unknown as IProduct;
            if (!orderItem || !orderItem.product || !product.price) {
                throw new Error('Invalid order item or product price');
            }
            return product.price * orderItem.quantity;
        }));

        const totalPrice = totalPrices.reduce((acc, price) => acc + price, 0);

        const newOrder = new Order({
            orderItems: orderItemsIds,
            shippingAddress: orderInput.shippingAddress,
            city: orderInput.city,
            zip: orderInput.zip,
            country: orderInput.country,
            phone: orderInput.phone,
            status: orderInput.status,
            totalPrice: totalPrice,
            user: orderInput.user,
        });

        await newOrder.save();
        return newOrder;
    } catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
};

export const updateOrderService = async (orderId: string, status: string) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        if (!updatedOrder) {
            throw new Error('Order not found');
        }
        return updatedOrder;
    } catch (error) {
        throw new Error(`Failed to update order: ${error.message}`);
    }
};

export const deleteOrderService = async (orderId: string) => {
    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        await Promise.all(order.orderItems.map(async (orderItemId) => {
            await OrderItem.findByIdAndDelete(orderItemId);
        }));

        return { success: true, message: 'The order and associated items are deleted!' };
    } catch (error) {
        throw new Error(`Failed to delete order and items: ${error.message}`);
    }
};

export const getOrderService = async (orderId: string) => {
    try {
        const order = await Order.findById(orderId).populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                select: 'price',
            },
        }).populate('user', 'name');
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    } catch (error) {
        throw new Error(`Failed to fetch order: ${error.message}`);
    }
};

export const getOrdersService = async () => {
    try {
        return await Order.find().populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                select: 'price',
            },
        }).populate('user', 'name');
    } catch (error) {
        throw new Error(`Failed to fetch orders: ${error.message}`);
    }
};

export const getOrdersByUserService = async (userId: string) => {
    try {
        return await Order.find({ user: userId }).populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                select: 'price',
            },
        }).populate('user', 'name');
    } catch (error) {
        throw new Error(`Failed to fetch orders by user: ${error.message}`);
    }
};

export const getOrdersByStatusService = async (status: string) => {
    try {
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        console.log(validStatuses);
        console.log(status);
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid status');
        }
        console.log(status);

        return await Order.find({ status }).populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                select: 'price',
            },
        }).populate('user', 'name');

        
    } catch (error) {
        throw new Error(`Failed to fetch orders by status: ${error.message}`);
    }

};

export const orderCountService = async () => {
    try {
        return await Order.countDocuments();
    } catch (error) {
        throw new Error(`Failed to fetch order count: ${error.message}`);
    }
};

export const totalSalesService = async () => {
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } },
        ]);
        return totalSales[0].totalSales;
    } catch (error) {
        throw new Error(`Failed to fetch total sales: ${error.message}`);
    }
}

