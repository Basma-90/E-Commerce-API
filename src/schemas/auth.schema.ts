import {object , string} from 'zod';

export const createAuthScema= object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email"),
        password: string({
            required_error: "Password is required",
        }).min(6, "Password too short - should be 6 chars minimum"),
    }),
    })
