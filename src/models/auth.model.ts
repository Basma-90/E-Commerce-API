import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";



export interface AuthDocument extends mongoose.Document {
    user:UserDocument['_id'];  
    valid:boolean;
    userAgent:string;
    createdAt: Date;
    updatedAt: Date;
}

const AuthSchema: Schema = new Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    valid:{type:Boolean, default:true},
    userAgent: {type:String}
},
{
    timestamps: true
});



const Auth = mongoose.model<AuthDocument>('Auth', AuthSchema);
export default Auth;

