import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IOrderItem } from './orderItem.model';

export interface IOrder extends Document {
    orderItems: Array<IOrderItem>;
    shippingAddress: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
    status: string;
    totalPrice: number;
    user: string;
}

const OrderSchema: Schema = new Schema({
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
    shippingAddress: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, required: true, default: 'Pending' },
    totalPrice: { type: Number, required: false},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
