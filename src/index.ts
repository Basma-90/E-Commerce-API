import express from 'express';
import { json } from 'body-parser';
import  dbConnect from './configDB/db.config';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import productRouter from './routes/product.route';
import orderRouter from './routes/order.route';
import categoryRouter from './routes/category.route';
import { deserializeUser } from './middlewares/auth.middleware';


dbConnect();
const app = express();
app.use(json());
app.use(deserializeUser);

console.log(config.get('accessTokenTTL'));
console.log(config.get('accessPrivateKey'));    

//config routes
app.use(userRouter);
app.use(authRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(orderRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


