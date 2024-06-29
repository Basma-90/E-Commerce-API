import { object, string, number, TypeOf } from 'zod';

const createOrderItemSchema = object({
    body: object({
        product: string({
            required_error: 'Product ID is required',
        }),
        quantity: number({
            required_error: 'Quantity is required',
        }).min(1, 'Quantity must be at least 1'),
    }),
});

export type CreateOrderItemInput = TypeOf<typeof createOrderItemSchema>;
