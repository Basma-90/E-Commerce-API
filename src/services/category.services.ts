import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import {ICategory}  from "../models/category.model";
import Category from "../models/category.model";

export async function createCategory(category: ICategory): Promise<ICategory> {
    try {
        return await Category.create(category);
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateCategory(
    filter: FilterQuery<ICategory>,
    update: UpdateQuery<ICategory>,
    options: QueryOptions
): Promise<ICategory | null> {
    return await Category.findOneAndUpdate(filter, update, options);
}

export async function findCategory(
    query: FilterQuery<ICategory>,
    options: QueryOptions = { lean: true }
): Promise<ICategory | null> {
    try {
        return await Category.findOne(query, {}, options);
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function deleteCategory(query: FilterQuery<ICategory>): Promise<ICategory | null> {
    return await Category.findOneAndDelete(query);
}

export async function getCategories(): Promise<ICategory[]> {
    return await Category.find();
}

