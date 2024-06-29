import { object, number, string, TypeOf } from 'zod';


const payload = {
    body: object({
        name: string({
            required_error: 'Name is required',
        }),
        description: string({
            required_error: 'Description is required',
        }).min(20, 'Description should be at least 20 characters long'),
        price: number({
            required_error: 'Price is required',
        }).min(0, 'Price must be a positive number'),
        category: string({
            required_error: 'Category ID is required',
        }),
    }),
};

const params={
    params: object({
        id: string({
            required_error: 'Product ID is required',
        }),
    }),
};


const query = {
    query: object({
        search: string().optional(),
        page: number().min(1).default(1).optional(),
        limit: number().min(1).default(10).optional(),
    }),
};

export const createProductSchema = object({
    ...payload,
});


export const updateProductSchema = object({
    ...payload,
    ...params
});

export const deleteProductSchema = object({
    ...params,
});


export const getProductSchema = object({
    ...params,
});

export const searchProductsSchema = object({
    ...query,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
export type SearchProductsInput = TypeOf<typeof searchProductsSchema>;
