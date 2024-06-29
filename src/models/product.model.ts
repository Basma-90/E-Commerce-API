import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: mongoose.Schema.Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' , required: true}
});

ProductSchema.index({name: 'text', description: 'text'});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
