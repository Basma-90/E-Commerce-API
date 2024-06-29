import dotenv from 'dotenv';    
dotenv.config();
import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';


const dbConnect = async(): Promise<void> => {
    try{
        await mongoose.connect(process.env.DATABASE_URI as string, {
        } as ConnectOptions);
        console.log('Connected to database');
    }
    catch(err){
        console.log(err);
        console.log('Error connecting to database');
    }
}

export default dbConnect;