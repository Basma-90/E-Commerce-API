import { Request, Response } from 'express';
import { ICategory } from '../models/category.model';
import * as categoryService from '../services/category.services';

export async function createCategory(req: Request, res: Response): Promise<void> {
    try {
        const category: ICategory = req.body;
        const newCategory: ICategory = await categoryService.createCategory(category);
        res.status(201).json(newCategory);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function updateCategory(req: Request, res: Response): Promise<void> {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const updatedCategory: ICategory | null = await categoryService.updateCategory(filter, update, options);
        if (updatedCategory) {
            res.json(updatedCategory);
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}


export async function findCategory(req: Request, res: Response): Promise<void> {
    try {
        const query = { _id: req.params.id };
        const category: ICategory | null = await categoryService.findCategory(query);
        if (category) {
            res.json(category);
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}


export async function deleteCategory(req: Request, res: Response): Promise<void> {
    try {
        const query = { _id: req.params.id };
        const deletedCategory: ICategory | null = await categoryService.deleteCategory(query);
        if (deletedCategory) {
            res.json(deletedCategory);
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function getCategories(req: Request, res: Response): Promise<void> {
    try {
        const categories: ICategory[] = await categoryService.getCategories();
        res.json(categories);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

