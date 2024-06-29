import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface IOrderItem extends Document {
    product:mongoose.Types.ObjectId;
    quantity: number;
}

const OrderItemSchema: Schema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' } ,
    quantity: { type: Number, required: true }
});


const OrderItem = mongoose.model<IOrderItem>('OrderItem', OrderItemSchema);
export default OrderItem;
