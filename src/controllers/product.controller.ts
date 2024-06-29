//now implement the controller from the service
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { IProduct } from '../models/product.model';
import * as productService from '../services/product.services';
import exp from 'constants';
import Product from '../models/product.model';

export async function createProduct(req: Request, res: Response): Promise<void> {
    try {
        const product: IProduct = req.body;
        const newProduct: IProduct = await productService.createProduct(product);
        res.status(201).json(newProduct);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const updatedProduct: IProduct | null = await productService.updateProduct(filter, update, options);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function findProduct(req: Request, res: Response): Promise<void> {
    try {
        const query = { _id: req.params.id };
        const product: IProduct | null = await productService.findProduct(query);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
    try {
        const query = { _id: req.params.id };
        const deletedProduct: IProduct | null = await productService.deleteProduct(query);
        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}
export async function listProducts(req: Request, res: Response): Promise<void> {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
            const page = req.query.page ? parseInt(req.query.page as string) : 1;
            const skip = (page - 1) * limit;
    
            
            const fields = req.query.fields ? (req.query.fields as string) : '';
    
            const products = await productService.listProducts(req.query, limit, skip, fields);
    
            res.status(200).json({
                status: 'success',
                results: products.length,
                data: {
                    products,
                },
            });
        } catch (error: any) {
            res.status(400).json({
                status: 'error',
                message: error.message,
            });
        }
    }