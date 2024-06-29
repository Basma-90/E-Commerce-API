import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import { IProduct } from "../models/product.model";
import Product from "../models/product.model";
import { Request, Response } from 'express';

interface QueryParams {
    [key: string]: any;
}


export async function createProduct(product: IProduct): Promise<IProduct> {
    try {
        return await Product.create(product);
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateProduct(
    filter: FilterQuery<IProduct>,
    update: UpdateQuery<IProduct>,
    options: QueryOptions
): Promise<IProduct | null> {
    return await Product.findOneAndUpdate(filter, update, options);
}

export async function findProduct(
    query: FilterQuery<IProduct>,
    options: QueryOptions = { lean: true }
): Promise<IProduct | null> {
    try {
        return await Product.findOne(query, {}, options);
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function deleteProduct(query: FilterQuery<IProduct>): Promise<IProduct | null> {
    return await Product.findOneAndDelete(query);
}

export async function listProducts(queryParams: QueryParams, limit: number, skip: number, fields?: string): Promise<IProduct[]> {
    let query: any = {};

    if (queryParams.search) {
        const search = queryParams.search as string;
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

    if (queryParams.minPrice && queryParams.maxPrice) {
        query.price = {
            $gte: parseFloat(queryParams.minPrice),
            $lte: parseFloat(queryParams.maxPrice),
        };
    } else if (queryParams.minPrice) {
        query.price = { $gte: parseFloat(queryParams.minPrice) };
    } else if (queryParams.maxPrice) {
        query.price = { $lte: parseFloat(queryParams.maxPrice) };
    }

    const projection = fields ? fields.split(',').join(' ') : ''; 
    return Product.find(query).select(projection).skip(skip).limit(limit);
}





