import { object, number, string, array, TypeOf } from 'zod';

const orderItemPayload = object({
    product: string({ required_error: 'Product ID is required' }),
    quantity: number({ required_error: 'Quantity is required' }).min(1, 'Quantity must be at least 1'),
});


const orderPayload = {
    body: object({
        orderItems: array(orderItemPayload).nonempty('Order must contain at least one item'),
        shippingAddress: string({ required_error: 'Shipping address is required' }),
        city: string({ required_error: 'City is required' }),
        zip: string({ required_error: 'Zip code is required' }),
        country: string({ required_error: 'Country is required' }),
        phone: string({ required_error: 'Phone number is required' }),
        status: string({ required_error: 'Status is required' }).default('Pending'),
        user: string({ required_error: 'User ID is required' }),
    }),
};


const params = {
    params: object({
        id: string({ required_error: 'Order ID is required' }),
    }),
};


export const createOrderSchema = object({
    ...orderPayload,
});

export const updateOrderSchema = object({
    ...orderPayload,
    ...params,
});

export const deleteOrderSchema = object({
    ...params,
});

export const getOrderSchema = object({
    ...params,
});


export type CreateOrderInput = TypeOf<typeof createOrderSchema>;
export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>;
export type DeleteOrderInput = TypeOf<typeof deleteOrderSchema>;
export type GetOrderInput = TypeOf<typeof getOrderSchema>;
