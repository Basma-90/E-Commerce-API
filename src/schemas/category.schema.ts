import {object , string , TypeOf} from 'zod';

const payload = {
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
    })
};

const params={
    params: object({
        id: string({
            required_error: 'Category ID is required',
        }),
    }),
};

export const createCategorySchema =object({...payload,});
export const updateCategorySchema =object({...payload, ...params});
export const deleteCategorySchema =object({...params});
export const getCategorySchema =object({...params});


export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
export type GetCategoryInput = TypeOf<typeof getCategorySchema>;
